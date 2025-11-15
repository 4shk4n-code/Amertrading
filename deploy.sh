#!/bin/bash

# Auto-deployment script for VPS
# This script pulls from git, installs dependencies, builds, and restarts the app
# Called automatically by GitHub Actions on every push

set -e  # Exit on error

echo "🚀 Starting deployment..."
echo "Timestamp: $(date)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/amertrading-web"
BRANCH="master"  # Change if using different branch
APP_NAME="amertrading-web"

# Navigate to project directory
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Project directory not found: $PROJECT_DIR${NC}"
    exit 1
fi

cd "$PROJECT_DIR" || exit 1

echo -e "${BLUE}📦 Step 1: Pulling latest changes from git...${NC}"
git fetch origin
git reset --hard origin/$BRANCH
git clean -fd
echo -e "${GREEN}✅ Latest code pulled${NC}"

echo -e "${BLUE}📥 Step 2: Installing dependencies...${NC}"
npm install --production=false
echo -e "${GREEN}✅ Dependencies installed${NC}"

echo -e "${BLUE}🔨 Step 3: Generating Prisma client...${NC}"
npm run db:generate || {
    echo -e "${YELLOW}⚠️  Prisma generate failed, but continuing...${NC}"
}

echo -e "${BLUE}🏗️  Step 4: Building Next.js application...${NC}"
npm run build
echo -e "${GREEN}✅ Build completed${NC}"

echo -e "${BLUE}🔄 Step 5: Restarting application with PM2...${NC}"
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "$APP_NAME"; then
        pm2 restart "$APP_NAME"
        echo -e "${GREEN}✅ Application restarted with PM2${NC}"
    else
        echo -e "${YELLOW}⚠️  PM2 app not found, starting new instance...${NC}"
        pm2 start ecosystem.config.js || pm2 start npm --name "$APP_NAME" -- start
        pm2 save
        echo -e "${GREEN}✅ Application started with PM2${NC}"
    fi
    
    # Show PM2 status
    echo ""
    echo -e "${BLUE}📊 PM2 Status:${NC}"
    pm2 list
else
    echo -e "${RED}❌ PM2 not found! Please install PM2 first.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your website should be live now${NC}"
echo "Deployment finished at: $(date)"

