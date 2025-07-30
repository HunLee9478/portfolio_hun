#!/bin/bash
# Production Start Script for Replit Deployment

echo "🚀 Starting production deployment process..."

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-5000}
export HOST=${HOST:-0.0.0.0}

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci --only=production
fi

# Build the application
echo "🔨 Building application for production..."
npm run build

# Check if build was successful
if [ ! -f "dist/index.js" ]; then
    echo "❌ Build failed: Server file not found"
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo "❌ Build failed: Client files not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Start the production server
echo "🚀 Starting production server on port $PORT..."
exec npm start