#!/usr/bin/env node

/**
 * Production Build Script
 * This script builds the application for production deployment
 */

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import path from 'path';

console.log('🏗️  Starting production build...');

try {
  // Clean previous build
  if (existsSync('dist')) {
    console.log('🧹 Cleaning previous build...');
    rmSync('dist', { recursive: true, force: true });
  }

  // Set production environment
  process.env.NODE_ENV = 'production';

  console.log('📦 Building client with Vite...');
  execSync('vite build', { stdio: 'inherit' });

  console.log('🔧 Building server with esbuild...');
  execSync('esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });

  console.log('✅ Production build completed successfully!');
  console.log('📁 Build output: ./dist');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}