#!/bin/bash
# Spiral Sussex Tracker - Server Setup
# Run this on your IONOS VPS after cloning the repo

echo "================================"
echo "  Spiral Tracker Server Setup"
echo "================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

echo "Node.js: $(node -v)"
echo "npm: $(npm -v)"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm install

# Install PM2 globally (keeps the server running)
echo ""
echo "Installing PM2 (process manager)..."
npm install -g pm2

# Start the server
echo ""
echo "Starting server..."
pm2 start server.js --name spiral-tracker

# Set PM2 to start on boot
pm2 save
pm2 startup

echo ""
echo "================================"
echo "  Setup complete!"
echo "================================"
echo ""
echo "  Server running on port 3000"
echo ""
echo "  Default login:"
echo "    Username: admin"
echo "    Password: spiral2026"
echo ""
echo "  CHANGE THE PASSWORD after first login!"
echo ""
echo "  Useful commands:"
echo "    pm2 status          - check if running"
echo "    pm2 logs            - view logs"
echo "    pm2 restart spiral-tracker  - restart"
echo "    pm2 stop spiral-tracker     - stop"
echo ""
echo "  Next: Set up Plesk to proxy port 3000"
echo "        to your domain/subdomain"
echo "================================"
