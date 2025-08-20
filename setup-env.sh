#!/bin/bash

echo "🚀 FitMatch Environment Setup"
echo "=============================="

# Check if .env file exists
if [ -f ".env" ]; then
    echo "✅ .env file already exists"
    echo "Current WEB_APP_URL: $(grep 'WEB_APP_URL' .env | cut -d '=' -f2)"
else
    echo "📝 Creating .env file..."
    
    # Create .env file with development defaults
    cat > .env << EOF
# FitMatch Environment Variables
# =============================

# Web App URL for invitation links
# Development: Use localhost or your local Expo dev server
# Production: Use your actual domain when you have it
WEB_APP_URL=http://localhost:3000

# API Configuration
API_BASE_URL=http://localhost:3000/api
API_LOCAL_IP=192.168.1.100

# Other Configuration
NODE_ENV=development
EOF

    echo "✅ .env file created with development defaults"
fi

echo ""
echo "🔧 Configuration Options:"
echo "1. Development (localhost): WEB_APP_URL=http://localhost:3000"
echo "2. Expo Dev Server: WEB_APP_URL=exp://192.168.1.100:8081"
echo "3. Production: WEB_APP_URL=https://yourdomain.com"
echo ""
echo "📖 Edit .env file to change WEB_APP_URL"
echo "🔄 Restart your development server after making changes"
echo ""
echo "🎯 Current invitation links will use: $(grep 'WEB_APP_URL' .env | cut -d '=' -f2)"
