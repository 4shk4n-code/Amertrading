#!/bin/bash

# Auto-deployment script for Hostinger VPS
# This script pulls from git, installs dependencies, builds, and restarts the app

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration - UPDATE THESE PATHS
PROJECT_DIR="/var/www/amertrading-web"  # Change to your project directory
BRANCH="master"  # Change if using different branch
APP_NAME="amertrading-web"  # PM2 app name

# Navigate to project directory
cd "$PROJECT_DIR" || exit 1

echo -e "${YELLOW}📦 Pulling latest changes from git...${NC}"
git fetch origin
git reset --hard origin/$BRANCH
git clean -fd

echo -e "${YELLOW}📥 Installing dependencies...${NC}"
npm install --production=false

echo -e "${YELLOW}🔨 Generating Prisma client...${NC}"
npm run db:generate || echo "⚠️  Prisma generate failed, continuing..."

echo -e "${YELLOW}🏗️  Building Next.js application...${NC}"
npm run build

echo -e "${YELLOW}🔄 Restarting application...${NC}"
# Check if PM2 is installed and app exists
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "$APP_NAME"; then
        pm2 restart "$APP_NAME"
        echo -e "${GREEN}✅ Application restarted with PM2${NC}"
    else
        echo -e "${YELLOW}⚠️  PM2 app not found, starting new instance...${NC}"
        pm2 start npm --name "$APP_NAME" -- start
        pm2 save
    fi
else
    echo -e "${YELLOW}⚠️  PM2 not found, you may need to restart manually${NC}"
    echo "Run: npm start"
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your website should be live now${NC}"

