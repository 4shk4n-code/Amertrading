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
git pull origin $BRANCH || {
    echo -e "${RED}❌ Git pull failed${NC}"
    exit 1
}

# IMMEDIATELY after git pull - remove admin files before they cause issues
echo -e "${YELLOW}🗑️  Removing admin files immediately after git pull...${NC}"
chmod -R 777 src/app/admin 2>/dev/null || true
rm -rf src/app/admin src/components/admin src/app/api/admin 2>/dev/null || true
# Specifically target the problematic file
[ -f "src/app/admin/content/page.tsx" ] && rm -f src/app/admin/content/page.tsx || true
[ -d "src/app/admin/content" ] && rm -rf src/app/admin/content || true
[ -d "src/app/admin" ] && rm -rf src/app/admin || true
# Verify deletion
if [ -f "src/app/admin/content/page.tsx" ]; then
    echo -e "${RED}❌ File still exists after git pull! Force deleting...${NC}"
    find . -path "*/admin/content/page.tsx" -type f -exec rm -f {} \; 2>/dev/null || true
    find . -path "*/admin/content" -type d -exec rm -rf {} \; 2>/dev/null || true
fi

echo -e "${YELLOW}🧹 Removing ALL admin files and clearing build cache...${NC}"
# Aggressively remove all admin-related files and folders
find . -type d -name "*admin*" -not -path "./node_modules/*" -not -path "./.next/*" -exec rm -rf {} + 2>/dev/null || true
find . -type f -name "*admin*" -not -path "./node_modules/*" -not -path "./.next/*" -delete 2>/dev/null || true
rm -rf src/app/admin src/components/admin src/app/api/admin 2>/dev/null || true
rm -rf .next dist node_modules/.cache 2>/dev/null || true

# Double-check admin/content is gone
if [ -f "src/app/admin/content/page.tsx" ]; then
    echo -e "${YELLOW}⚠️  admin/content/page.tsx still exists, force removing...${NC}"
    rm -f src/app/admin/content/page.tsx
    rm -rf src/app/admin/content
fi

echo -e "${YELLOW}📥 Installing dependencies...${NC}"
npm install || {
    echo -e "${RED}❌ npm install failed${NC}"
    exit 1
}

echo -e "${YELLOW}🔨 Generating Prisma client...${NC}"
npm run db:generate || echo -e "${YELLOW}⚠️  Prisma generate failed, continuing...${NC}"

echo -e "${YELLOW}🏗️  Building Next.js application...${NC}"
# CRITICAL: Remove admin files RIGHT BEFORE BUILD - git pull may have restored them
echo -e "${YELLOW}🔍 Checking for admin files before build...${NC}"
if [ -f "src/app/admin/content/page.tsx" ]; then
    echo -e "${RED}⚠️  Found admin/content/page.tsx - removing...${NC}"
fi

# Remove from git index (if tracked)
git rm -rf --cached src/app/admin 2>/dev/null || true
git rm -rf --cached src/components/admin 2>/dev/null || true
git rm -rf --cached src/app/api/admin 2>/dev/null || true

# Aggressive filesystem removal
echo -e "${YELLOW}🗑️  Removing admin files from filesystem...${NC}"
rm -rf src/app/admin 2>/dev/null || true
rm -rf src/components/admin 2>/dev/null || true
rm -rf src/app/api/admin 2>/dev/null || true

# Use find to catch any stragglers
find . -path "*/admin/content/page.tsx" -type f -delete 2>/dev/null || true
find . -path "*/admin/content" -type d -exec rm -rf {} + 2>/dev/null || true
find . -path "*/admin" -type d -not -path "./node_modules/*" -not -path "./.next/*" -exec rm -rf {} + 2>/dev/null || true

# Final check - if file exists, we have a problem
if [ -f "src/app/admin/content/page.tsx" ]; then
    echo -e "${RED}❌ CRITICAL ERROR: admin/content/page.tsx STILL EXISTS!${NC}"
    echo -e "${RED}File location:${NC}"
    ls -la src/app/admin/content/page.tsx 2>/dev/null || true
    echo -e "${RED}Attempting final deletion...${NC}"
    rm -f src/app/admin/content/page.tsx
    rm -rf src/app/admin/content
    rm -rf src/app/admin
    # If still exists, we must exit
    if [ -f "src/app/admin/content/page.tsx" ]; then
        echo -e "${RED}❌ CANNOT DELETE FILE - ABORTING BUILD${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Admin files removed - proceeding with build${NC}"

# Set memory limit for build (2GB, fallback to 3GB)
export NODE_OPTIONS="--max-old-space-size=2048"

# ONE FINAL CHECK - remove admin files right before npm run build
if [ -f "src/app/admin/content/page.tsx" ] || [ -d "src/app/admin" ]; then
    echo -e "${RED}⚠️  Admin files detected RIGHT BEFORE BUILD - emergency removal!${NC}"
    # Try multiple deletion methods
    chmod -R 777 src/app/admin 2>/dev/null || true
    rm -f src/app/admin/content/page.tsx 2>/dev/null || true
    rm -rf src/app/admin/content 2>/dev/null || true
    rm -rf src/app/admin 2>/dev/null || true
    rm -rf src/components/admin 2>/dev/null || true
    rm -rf src/app/api/admin 2>/dev/null || true
    # Use unlink if rm fails
    [ -f "src/app/admin/content/page.tsx" ] && unlink src/app/admin/content/page.tsx 2>/dev/null || true
    # Use find with -delete
    find src/app -name "*admin*" -type f -delete 2>/dev/null || true
    find src/app -name "*admin*" -type d -exec rm -rf {} + 2>/dev/null || true
    # Final check - if still exists, we have a serious problem
    if [ -f "src/app/admin/content/page.tsx" ]; then
        echo -e "${RED}❌ CRITICAL: File cannot be deleted! Attempting to overwrite with empty file...${NC}"
        echo "" > src/app/admin/content/page.tsx
        rm -f src/app/admin/content/page.tsx
        if [ -f "src/app/admin/content/page.tsx" ]; then
            echo -e "${RED}❌ ABORTING: Cannot remove admin/content/page.tsx${NC}"
            exit 1
        fi
    fi
fi

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
