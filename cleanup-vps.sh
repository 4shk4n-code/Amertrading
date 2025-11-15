#!/bin/bash

# VPS Cleanup Script - Removes all deployment files and configurations
# Keeps DNS settings (DNS is managed at domain registrar, not on VPS)
# Usage: bash cleanup-vps.sh

set -e

echo "🧹 VPS Cleanup Script - Removing all deployment files"
echo "======================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration - UPDATE THESE IF DIFFERENT
PROJECT_DIR="/var/www/amertrading-web"  # Change if your project is elsewhere
APP_NAME="amertrading-web"  # PM2 app name
NGINX_SITE="amertrading"  # Nginx site name

echo -e "${YELLOW}⚠️  WARNING: This will remove all deployment files and configurations!${NC}"
echo -e "${YELLOW}⚠️  DNS settings are NOT affected (managed at domain registrar)${NC}"
echo ""
read -p "Are you sure you want to continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${RED}❌ Cleanup cancelled${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🛑 Step 1: Stopping and removing PM2 processes...${NC}"

# Stop and delete PM2 app
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "$APP_NAME"; then
        pm2 stop "$APP_NAME" || true
        pm2 delete "$APP_NAME" || true
        echo -e "${GREEN}✅ PM2 app '$APP_NAME' stopped and removed${NC}"
    else
        echo -e "${YELLOW}⚠️  PM2 app '$APP_NAME' not found${NC}"
    fi
    
    # Remove PM2 startup script
    pm2 unstartup || true
    echo -e "${GREEN}✅ PM2 startup script removed${NC}"
else
    echo -e "${YELLOW}⚠️  PM2 not installed${NC}"
fi

echo ""
echo -e "${BLUE}🗑️  Step 2: Removing project directory...${NC}"

if [ -d "$PROJECT_DIR" ]; then
    echo -e "${YELLOW}Removing: $PROJECT_DIR${NC}"
    sudo rm -rf "$PROJECT_DIR"
    echo -e "${GREEN}✅ Project directory removed${NC}"
else
    echo -e "${YELLOW}⚠️  Project directory not found: $PROJECT_DIR${NC}"
fi

echo ""
echo -e "${BLUE}🌐 Step 3: Removing Nginx configuration...${NC}"

if command -v nginx &> /dev/null; then
    # Remove Nginx site config
    if [ -f "/etc/nginx/sites-available/$NGINX_SITE" ]; then
        sudo rm -f "/etc/nginx/sites-available/$NGINX_SITE"
        echo -e "${GREEN}✅ Removed /etc/nginx/sites-available/$NGINX_SITE${NC}"
    fi
    
    if [ -L "/etc/nginx/sites-enabled/$NGINX_SITE" ]; then
        sudo rm -f "/etc/nginx/sites-enabled/$NGINX_SITE"
        echo -e "${GREEN}✅ Removed /etc/nginx/sites-enabled/$NGINX_SITE${NC}"
    fi
    
    # Test and reload Nginx
    sudo nginx -t && sudo systemctl reload nginx || true
    echo -e "${GREEN}✅ Nginx configuration cleaned${NC}"
else
    echo -e "${YELLOW}⚠️  Nginx not installed${NC}"
fi

echo ""
echo -e "${BLUE}🔍 Step 4: Checking for other deployment files...${NC}"

# Check for common deployment directories
OTHER_DIRS=(
    "/home/*/amertrading-web"
    "/opt/amertrading-web"
    "/root/amertrading-web"
)

for dir_pattern in "${OTHER_DIRS[@]}"; do
    for dir in $dir_pattern; do
        if [ -d "$dir" ]; then
            echo -e "${YELLOW}Found additional directory: $dir${NC}"
            read -p "Remove this directory? (yes/no): " REMOVE_DIR
            if [ "$REMOVE_DIR" == "yes" ]; then
                sudo rm -rf "$dir"
                echo -e "${GREEN}✅ Removed: $dir${NC}"
            fi
        fi
    done
done

echo ""
echo -e "${BLUE}📋 Step 5: Summary of what remains...${NC}"

echo ""
echo "The following are NOT removed (you may want to remove them manually):"
echo "  - Node.js installation: $(which node 2>/dev/null || echo 'Not found')"
echo "  - PM2 installation: $(which pm2 2>/dev/null || echo 'Not found')"
echo "  - Nginx installation: $(which nginx 2>/dev/null || echo 'Not found')"
echo "  - Git installation: $(which git 2>/dev/null || echo 'Not found')"
echo ""
echo "To remove these (optional), run:"
echo "  sudo apt-get remove --purge nodejs npm nginx git -y"
echo "  sudo npm uninstall -g pm2"
echo "  sudo apt-get autoremove -y"

echo ""
echo -e "${GREEN}✅ Cleanup completed!${NC}"
echo ""
echo -e "${YELLOW}📝 Note: DNS settings are managed at your domain registrar${NC}"
echo -e "${YELLOW}   (e.g., Hostinger, Cloudflare, etc.) and are NOT affected${NC}"
echo ""
echo -e "${GREEN}🎉 VPS is now clean and ready for fresh deployment!${NC}"

