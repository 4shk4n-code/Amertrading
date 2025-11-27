#!/bin/bash

# Script to update admin password in .env file
# Usage: ./scripts/update-admin-password.sh abdullah

NEW_PASSWORD="${1:-abdullah}"
ENV_FILE="${2:-.env}"

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE file not found!"
    echo "💡 Creating new .env file..."
    touch "$ENV_FILE"
fi

# Check if ADMIN_PASSWORD exists in .env
if grep -q "^ADMIN_PASSWORD=" "$ENV_FILE"; then
    # Update existing ADMIN_PASSWORD
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|^ADMIN_PASSWORD=.*|ADMIN_PASSWORD=$NEW_PASSWORD|" "$ENV_FILE"
    else
        # Linux
        sed -i "s|^ADMIN_PASSWORD=.*|ADMIN_PASSWORD=$NEW_PASSWORD|" "$ENV_FILE"
    fi
    echo "✅ Updated ADMIN_PASSWORD to: $NEW_PASSWORD"
else
    # Add ADMIN_PASSWORD if it doesn't exist
    echo "" >> "$ENV_FILE"
    echo "ADMIN_PASSWORD=$NEW_PASSWORD" >> "$ENV_FILE"
    echo "✅ Added ADMIN_PASSWORD: $NEW_PASSWORD"
fi

# Also ensure ADMIN_USERNAME exists (default to 'admin' if not set)
if ! grep -q "^ADMIN_USERNAME=" "$ENV_FILE"; then
    echo "ADMIN_USERNAME=admin" >> "$ENV_FILE"
    echo "✅ Added ADMIN_USERNAME: admin"
fi

echo ""
echo "📋 Current admin credentials:"
grep "^ADMIN_" "$ENV_FILE" | sed 's/PASSWORD=.*/PASSWORD=***hidden***/'
echo ""
echo "💡 To apply changes, restart the application:"
echo "   pm2 restart amertrading-web"

