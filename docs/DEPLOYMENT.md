# Deployment Guide

This guide covers various deployment options for the LEESEUNGHUN Portfolio website.

## 🚀 Deployment Options

### 1. Static Hosting (Recommended)

#### Netlify
```bash
# Build the project
npm run build

# The dist/public folder contains the built static files
# Simply drag and drop the dist/public folder to Netlify
```

#### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
```bash
# Build static version
npm run build:static

# Deploy to GitHub Pages
npm run deploy
```

### 2. Server Deployment

#### Node.js Hosting (Heroku, Railway, etc.)
```bash
# Set environment variables
PORT=5000
NODE_ENV=production

# Deploy commands
npm install
npm run build
npm start
```

#### Docker Deployment
```dockerfile
# Create Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
```

### 3. CDN Deployment

#### AWS S3 + CloudFront
```bash
# Build static files
npm run build

# Upload dist/public to S3 bucket
aws s3 sync dist/public s3://your-bucket-name

# Configure CloudFront distribution
```

## 🔧 Environment Configuration

### Production Environment Variables
```env
NODE_ENV=production
PORT=5000
```

### Development Environment Variables
```env
NODE_ENV=development
PORT=5000
```

## 📋 Pre-deployment Checklist

- [ ] Run tests: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in production build
- [ ] All assets load correctly
- [ ] Responsive design works on all devices
- [ ] Performance optimizations applied
- [ ] SEO meta tags configured
- [ ] Analytics tracking configured (if needed)
- [ ] Error pages configured
- [ ] SSL certificate configured
- [ ] Domain name configured

## 🛡️ Security Considerations

### Headers
```javascript
// Security headers for Express.js
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

### CSP (Content Security Policy)
```javascript
// Content Security Policy
res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
```

## 📊 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npm run analyze

# Optimize images
npm run optimize-images
```

### Caching Strategy
```javascript
// Cache static assets
app.use('/assets', express.static('assets', {
  maxAge: '1y',
  etag: false
}));
```

## 📈 Monitoring

### Performance Monitoring
- Set up Google Analytics
- Configure performance monitoring
- Set up error tracking (Sentry, etc.)

### Health Checks
```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

## 🔧 Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version compatibility
2. **Assets not loading**: Verify asset paths and CORS settings
3. **Slow loading**: Optimize images and enable compression
4. **Mobile issues**: Test responsive design thoroughly

### Debug Commands
```bash
# Check build output
npm run build -- --debug

# Test production build locally
npm run start

# Check for unused dependencies
npm run analyze
```

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review the GitHub issues
3. Contact the maintainers

---

*For more detailed deployment instructions, refer to your hosting provider's documentation.*