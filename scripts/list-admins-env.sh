#!/bin/bash

# Simple script to list admin accounts from .env file
# Doesn't require database connection

ENV_FILE="${1:-.env}"

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE file not found!"
    exit 1
fi

echo ""
echo "📋 Admin Configuration from .env file:"
echo "=" | head -c 60 && echo ""

# Check for credentials login
ADMIN_USERNAME=$(grep '^ADMIN_USERNAME=' "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")
ADMIN_PASSWORD=$(grep '^ADMIN_PASSWORD=' "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")

if [ -n "$ADMIN_USERNAME" ] && [ -n "$ADMIN_PASSWORD" ]; then
    echo ""
    echo "✅ Credentials Login Enabled:"
    echo "   Username: $ADMIN_USERNAME"
    echo "   Password: ${ADMIN_PASSWORD:0:3}*** (hidden)"
    echo ""
    echo "   Login at: /admin/signin"
else
    echo ""
    echo "❌ Credentials Login: Not configured"
    echo "   Set ADMIN_USERNAME and ADMIN_PASSWORD in .env"
fi

# Check for Google OAuth
ADMIN_ALLOWED_EMAILS=$(grep '^ADMIN_ALLOWED_EMAILS=' "$ENV_FILE" | cut -d '=' -f2- | tr -d '"' | tr -d "'")

if [ -n "$ADMIN_ALLOWED_EMAILS" ]; then
    echo ""
    echo "✅ Google OAuth Allowed Emails:"
    IFS=',' read -ra EMAILS <<< "$ADMIN_ALLOWED_EMAILS"
    for email in "${EMAILS[@]}"; do
        echo "   - $(echo "$email" | xargs)"
    done
    echo ""
    echo "   Login at: /admin/signin (use Google button)"
else
    echo ""
    echo "⚠️  Google OAuth: No email restrictions"
    echo "   Set ADMIN_ALLOWED_EMAILS in .env to restrict access"
fi

echo ""
echo "=" | head -c 60 && echo ""
echo ""

