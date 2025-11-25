#!/bin/bash

# Auto-deployment script for Hostinger VPS
# This script pulls from git, installs dependencies, builds, and restarts the app

set +e  # Don't exit on error - we'll handle it manually

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
cd "$PROJECT_DIR" || {
    echo -e "${RED}❌ Failed to navigate to $PROJECT_DIR${NC}"
    exit 1
}

echo -e "${YELLOW}📦 Pulling latest changes from git...${NC}"
git fetch origin || {
    echo -e "${RED}❌ Git fetch failed${NC}"
    exit 1
}
git reset --hard origin/$BRANCH || {
    echo -e "${RED}❌ Git reset failed${NC}"
    exit 1
}
git clean -fd

echo -e "${YELLOW}📥 Installing dependencies...${NC}"
npm install || {
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
}

echo -e "${YELLOW}🔨 Generating Prisma client...${NC}"
npm run db:generate || echo -e "${YELLOW}⚠️  Prisma generate failed, continuing...${NC}"

echo -e "${YELLOW}🏗️  Building Next.js application...${NC}"
# Set memory limit for build (2GB, fallback to 3GB)
export NODE_OPTIONS="--max-old-space-size=2048"
npm run build || {
    echo -e "${YELLOW}⚠️  Build with 2GB failed, trying 3GB...${NC}"
    export NODE_OPTIONS="--max-old-space-size=3072"
    npm run build || {
        echo -e "${RED}❌ Build failed even with increased memory${NC}"
        exit 1
    }
}

echo -e "${YELLOW}🔄 Restarting application...${NC}"
# Check if PM2 is installed and app exists
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "$APP_NAME"; then
        pm2 restart "$APP_NAME" || {
            echo -e "${RED}❌ PM2 restart failed${NC}"
            exit 1
        }
        echo -e "${GREEN}✅ Application restarted with PM2${NC}"
    else
        echo -e "${YELLOW}⚠️  PM2 app not found, starting new instance...${NC}"
        pm2 start npm --name "$APP_NAME" -- start || {
            echo -e "${RED}❌ PM2 start failed${NC}"
            exit 1
        }
        pm2 save || echo -e "${YELLOW}⚠️  PM2 save failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  PM2 not found, you may need to restart manually${NC}"
    echo "Run: npm start"
fi

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your website should be live now${NC}"
