#!/usr/bin/env node
/**
 * Production Deployment Script
 * Handles build and deployment for production environments
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting production deployment...');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

try {
  // Step 1: Build the application
  console.log('📦 Building application for production...');
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Step 2: Verify build exists
  if (!existsSync('dist/index.js')) {
    throw new Error('Build failed - server file not found');
  }
  if (!existsSync('dist/public')) {
    throw new Error('Build failed - client files not found');
  }

  console.log('✅ Application built successfully');
  console.log('📁 Server: dist/index.js');
  console.log('📁 Client: dist/public/');
  
  // Step 3: Start production server
  console.log('🚀 Starting production server...');
  execSync('npm start', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      PORT: process.env.PORT || '5000'
    }
  });

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n🔧 Suggested fixes:');
  console.log('- Ensure all dependencies are installed: npm install');
  console.log('- Check for TypeScript errors: npm run check');
  console.log('- Verify build script: npm run build');
  console.log('- Check server configuration in server/index.ts');
  process.exit(1);
}