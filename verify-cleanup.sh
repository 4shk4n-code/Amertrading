#!/bin/bash

# VPS Cleanup Verification Script
# Checks if all deployment files and configurations are removed
# Usage: bash verify-cleanup.sh

echo "🔍 VPS Cleanup Verification"
echo "=========================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_DIR="/var/www/amertrading-web"
APP_NAME="amertrading-web"
NGINX_SITE="amertrading"

CLEAN=true

echo -e "${BLUE}Checking PM2 processes...${NC}"
if command -v pm2 &> /dev/null; then
    if pm2 list | grep -q "$APP_NAME"; then
        echo -e "${RED}❌ PM2 app '$APP_NAME' still exists${NC}"
        pm2 list | grep "$APP_NAME"
        CLEAN=false
    else
        echo -e "${GREEN}✅ No PM2 app '$APP_NAME' found${NC}"
    fi
    
    # Check PM2 daemon
    if pgrep -x "pm2" > /dev/null; then
        echo -e "${YELLOW}⚠️  PM2 daemon is running (this is OK if you plan to use PM2 later)${NC}"
    else
        echo -e "${GREEN}✅ PM2 daemon is not running${NC}"
    fi
else
    echo -e "${GREEN}✅ PM2 is not installed${NC}"
fi

echo ""
echo -e "${BLUE}Checking project directories...${NC}"

# Check main project directory
if [ -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ Project directory still exists: $PROJECT_DIR${NC}"
    echo "   Contents:"
    ls -la "$PROJECT_DIR" | head -10
    CLEAN=false
else
    echo -e "${GREEN}✅ Project directory removed: $PROJECT_DIR${NC}"
fi

# Check other common locations
OTHER_DIRS=(
    "/home/*/amertrading-web"
    "/opt/amertrading-web"
    "/root/amertrading-web"
)

for dir_pattern in "${OTHER_DIRS[@]}"; do
    for dir in $dir_pattern; do
        if [ -d "$dir" ]; then
            echo -e "${RED}❌ Found additional directory: $dir${NC}"
            CLEAN=false
        fi
    done
done

echo ""
echo -e "${BLUE}Checking Nginx configurations...${NC}"

if command -v nginx &> /dev/null; then
    if [ -f "/etc/nginx/sites-available/$NGINX_SITE" ]; then
        echo -e "${RED}❌ Nginx config still exists: /etc/nginx/sites-available/$NGINX_SITE${NC}"
        CLEAN=false
    else
        echo -e "${GREEN}✅ Nginx config removed: /etc/nginx/sites-available/$NGINX_SITE${NC}"
    fi
    
    if [ -L "/etc/nginx/sites-enabled/$NGINX_SITE" ] || [ -f "/etc/nginx/sites-enabled/$NGINX_SITE" ]; then
        echo -e "${RED}❌ Nginx enabled site still exists: /etc/nginx/sites-enabled/$NGINX_SITE${NC}"
        CLEAN=false
    else
        echo -e "${GREEN}✅ Nginx enabled site removed${NC}"
    fi
else
    echo -e "${GREEN}✅ Nginx is not installed${NC}"
fi

echo ""
echo -e "${BLUE}Checking for any remaining amertrading files...${NC}"

# Search for any files/directories with amertrading in name
FOUND_FILES=$(find /var/www /home /opt /root -type d -name "*amertrading*" 2>/dev/null | grep -v "Permission denied" | head -10)

if [ -n "$FOUND_FILES" ]; then
    echo -e "${RED}❌ Found remaining amertrading directories:${NC}"
    echo "$FOUND_FILES"
    CLEAN=false
else
    echo -e "${GREEN}✅ No amertrading directories found${NC}"
fi

echo ""
echo -e "${BLUE}Checking running processes on port 3000...${NC}"

if command -v netstat &> /dev/null; then
    PORT_CHECK=$(netstat -tuln | grep ":3000" || true)
elif command -v ss &> /dev/null; then
    PORT_CHECK=$(ss -tuln | grep ":3000" || true)
else
    PORT_CHECK=""
fi

if [ -n "$PORT_CHECK" ]; then
    echo -e "${YELLOW}⚠️  Port 3000 is in use:${NC}"
    echo "$PORT_CHECK"
    echo -e "${YELLOW}   (This might be from another service)${NC}"
else
    echo -e "${GREEN}✅ Port 3000 is not in use${NC}"
fi

echo ""
echo -e "${BLUE}Checking for Node.js processes...${NC}"

NODE_PROCESSES=$(ps aux | grep -E "node|next" | grep -v grep | grep -v "verify-cleanup" || true)

if [ -n "$NODE_PROCESSES" ]; then
    echo -e "${YELLOW}⚠️  Found Node.js/Next.js processes:${NC}"
    echo "$NODE_PROCESSES"
    echo -e "${YELLOW}   (These might be from other applications)${NC}"
else
    echo -e "${GREEN}✅ No Node.js/Next.js processes running${NC}"
fi

echo ""
echo "=========================="
if [ "$CLEAN" = true ]; then
    echo -e "${GREEN}✅ VPS IS CLEAN!${NC}"
    echo -e "${GREEN}All deployment files and configurations have been removed.${NC}"
else
    echo -e "${RED}❌ VPS IS NOT FULLY CLEAN${NC}"
    echo -e "${RED}Some files or configurations still remain.${NC}"
    echo -e "${YELLOW}Please review the items marked with ❌ above.${NC}"
fi
echo ""

