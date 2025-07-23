#!/usr/bin/env node
/**
 * Production Build Script
 * Handles both client and server builds with error handling
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import path from 'path';

const BUILD_DIR = 'dist';
const CLIENT_BUILD_DIR = 'dist/public';
const SERVER_BUILD_FILE = 'dist/index.js';

console.log('🚀 Starting production build...');

try {
  // Clean previous build
  if (existsSync(BUILD_DIR)) {
    console.log('🧹 Cleaning previous build...');
    rmSync(BUILD_DIR, { recursive: true, force: true });
  }

  // Create build directory
  mkdirSync(BUILD_DIR, { recursive: true });

  // Build client
  console.log('📦 Building client...');
  execSync('npx vite build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Build server
  console.log('🖥️  Building server...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    stdio: 'inherit'
  });

  // Copy assets
  console.log('📋 Copying assets...');
  execSync('cp -r assets dist/', { stdio: 'inherit' });

  // Verify build
  if (!existsSync(CLIENT_BUILD_DIR)) {
    throw new Error('Client build failed - no public directory found');
  }
  
  if (!existsSync(SERVER_BUILD_FILE)) {
    throw new Error('Server build failed - no index.js found');
  }

  console.log('✅ Build completed successfully!');
  console.log(`📁 Client files: ${CLIENT_BUILD_DIR}`);
  console.log(`📁 Server file: ${SERVER_BUILD_FILE}`);
  console.log(`📁 Assets: ${BUILD_DIR}/assets`);

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}