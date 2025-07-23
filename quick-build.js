#!/usr/bin/env node
/**
 * Quick Build Script - Optimized for speed
 */

import { execSync } from 'child_process';
import { existsSync, rmSync, mkdirSync, cpSync } from 'fs';

console.log('🚀 Quick production build...');

try {
  // Clean dist
  if (existsSync('dist')) {
    rmSync('dist', { recursive: true, force: true });
  }
  mkdirSync('dist', { recursive: true });

  // Build client only (faster)
  console.log('📦 Building client...');
  execSync('npx vite build --outDir dist/public', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Copy server files (no build needed for simple server)
  console.log('🖥️  Copying server...');
  cpSync('server', 'dist/server', { recursive: true });

  // Copy assets
  console.log('📋 Copying assets...');
  cpSync('assets', 'dist/assets', { recursive: true });

  // Copy other necessary files
  cpSync('shared', 'dist/shared', { recursive: true });
  cpSync('package.json', 'dist/package.json');

  console.log('✅ Quick build completed!');
  console.log('📁 Ready for deployment in dist/ folder');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}