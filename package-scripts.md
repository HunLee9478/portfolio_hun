# Package Scripts Guide

Since package.json cannot be modified directly, here are the custom scripts you can use for deployment:

## Build & Deploy Scripts

### Build for Production
```bash
node build.js
```
This script:
- Cleans previous build
- Builds client with Vite
- Builds server with esbuild
- Copies assets
- Verifies build completion

### Start Production Server
```bash
node start.js
```
This script:
- Checks if build exists
- Sets production environment
- Starts server with proper error handling
- Handles graceful shutdown

### Deploy to Different Platforms
```bash
# Static hosting (Netlify, Vercel, etc.)
DEPLOYMENT_TYPE=static node deploy.js

# Vercel
DEPLOYMENT_TYPE=vercel node deploy.js

# Netlify
DEPLOYMENT_TYPE=netlify node deploy.js

# GitHub Pages
DEPLOYMENT_TYPE=github-pages node deploy.js
```

### Health Check
```bash
node health-check.js
```
Verifies server is running and responsive.

## Docker Deployment

### Build Docker Image
```bash
docker build -t leeseunghun-portfolio .
```

### Run with Docker
```bash
docker run -p 5000:5000 leeseunghun-portfolio
```

### Use Docker Compose
```bash
docker-compose up -d
```

## PM2 Deployment

### Start with PM2
```bash
pm2 start ecosystem.config.js --env production
```

### Monitor
```bash
pm2 monit
```

### Stop
```bash
pm2 stop leeseunghun-portfolio
```

## Environment Variables

Create a `.env` file:
```env
NODE_ENV=production
PORT=5000
HOST=0.0.0.0
```

## Troubleshooting

### Common Issues:

1. **Port already in use**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **Build fails**
   ```bash
   # Clean and rebuild
   rm -rf dist node_modules
   npm install
   node build.js
   ```

3. **Assets not loading**
   ```bash
   # Check if assets are copied
   ls -la dist/assets/
   ```

4. **Server not accessible**
   ```bash
   # Check health
   node health-check.js
   ```

## Production Checklist

- [ ] Environment variables set
- [ ] Build completes successfully
- [ ] Health check passes
- [ ] Assets load correctly
- [ ] Port is accessible
- [ ] Error handling works
- [ ] Logs are being written
- [ ] Performance is acceptable