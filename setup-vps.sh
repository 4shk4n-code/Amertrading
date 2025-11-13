#!/bin/bash

# Complete VPS Setup Script for AMER TRADING Website
# Run this ONCE on your VPS to set everything up
# Usage: bash setup-vps.sh

set -e

echo "🚀 AMER TRADING VPS Setup Script"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration - USER INPUT REQUIRED
echo -e "${YELLOW}📝 Please provide the following information:${NC}"
read -p "Project directory path (e.g., /var/www/amertrading-web): " PROJECT_DIR
read -p "GitHub repository URL (e.g., https://github.com/4shk4n-code/Amertrading.git): " GIT_REPO
read -p "Branch name (default: master): " BRANCH
BRANCH=${BRANCH:-master}
read -p "PM2 app name (default: amertrading-web): " APP_NAME
APP_NAME=${APP_NAME:-amertrading-web}
read -p "Port number (default: 3000): " PORT
PORT=${PORT:-3000}
read -p "Domain name (optional, for Nginx): " DOMAIN

echo ""
echo -e "${BLUE}📦 Step 1: Installing system dependencies...${NC}"

# Update system
sudo apt-get update -y

# Install Node.js 20.x
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js already installed: $(node --version)"
fi

# Install Git
if ! command -v git &> /dev/null; then
    echo "Installing Git..."
    sudo apt-get install git -y
else
    echo "Git already installed: $(git --version)"
fi

# Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
else
    echo "PM2 already installed"
fi

# Install Nginx (optional)
if [ -n "$DOMAIN" ]; then
    if ! command -v nginx &> /dev/null; then
        echo "Installing Nginx..."
        sudo apt-get install nginx -y
    else
        echo "Nginx already installed"
    fi
fi

echo ""
echo -e "${BLUE}📥 Step 2: Cloning repository...${NC}"

# Create project directory if it doesn't exist
if [ ! -d "$PROJECT_DIR" ]; then
    sudo mkdir -p "$PROJECT_DIR"
    sudo chown -R $USER:$USER "$(dirname $PROJECT_DIR)"
    git clone "$GIT_REPO" "$PROJECT_DIR"
else
    echo "Directory exists, pulling latest changes..."
    cd "$PROJECT_DIR"
    git pull origin "$BRANCH"
fi

cd "$PROJECT_DIR"

echo ""
echo -e "${BLUE}📦 Step 3: Installing npm dependencies...${NC}"
npm install

echo ""
echo -e "${BLUE}⚙️  Step 4: Setting up configuration files...${NC}"

# Update deploy.sh with correct paths
sed -i "s|PROJECT_DIR=\"/var/www/amertrading-web\"|PROJECT_DIR=\"$PROJECT_DIR\"|g" deploy.sh
sed -i "s|BRANCH=\"master\"|BRANCH=\"$BRANCH\"|g" deploy.sh
sed -i "s|APP_NAME=\"amertrading-web\"|APP_NAME=\"$APP_NAME\"|g" deploy.sh
chmod +x deploy.sh

# Update ecosystem.config.js
sed -i "s|cwd: \"/var/www/amertrading-web\"|cwd: \"$PROJECT_DIR\"|g" ecosystem.config.js
sed -i "s|PORT: 3000|PORT: $PORT|g" ecosystem.config.js
sed -i "s|name: \"amertrading-web\"|name: \"$APP_NAME\"|g" ecosystem.config.js

# Create logs directory
mkdir -p logs

echo ""
echo -e "${YELLOW}⚠️  Step 5: Environment variables setup${NC}"
echo "Please create/edit .env file with your environment variables:"
echo "  - DATABASE_URL"
echo "  - ADMIN_USERNAME"
echo "  - ADMIN_PASSWORD"
echo "  - SANITY_PROJECT_ID"
echo "  - etc."
echo ""
read -p "Press Enter when you've set up your .env file..."

echo ""
echo -e "${BLUE}🔨 Step 6: Generating Prisma client...${NC}"
npm run db:generate || echo "⚠️  Prisma generate failed (may need DATABASE_URL)"

echo ""
echo -e "${BLUE}🏗️  Step 7: Building application...${NC}"
npm run build

echo ""
echo -e "${BLUE}🚀 Step 8: Starting with PM2...${NC}"
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo ""
if [ -n "$DOMAIN" ]; then
    echo -e "${BLUE}🌐 Step 9: Setting up Nginx...${NC}"
    
    # Create Nginx config
    sudo tee /etc/nginx/sites-available/amertrading > /dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

    # Enable site
    sudo ln -sf /etc/nginx/sites-available/amertrading /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t
    sudo systemctl restart nginx
    
    echo -e "${GREEN}✅ Nginx configured for $DOMAIN${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo "📋 Summary:"
echo "  - Project: $PROJECT_DIR"
echo "  - App name: $APP_NAME"
echo "  - Port: $PORT"
if [ -n "$DOMAIN" ]; then
    echo "  - Domain: $DOMAIN"
fi
echo ""
echo "🔧 Useful commands:"
echo "  - View logs: pm2 logs $APP_NAME"
echo "  - Restart: pm2 restart $APP_NAME"
echo "  - Status: pm2 status"
echo "  - Deploy: cd $PROJECT_DIR && bash deploy.sh"
echo ""
echo -e "${GREEN}🎉 Your website should be running now!${NC}"

