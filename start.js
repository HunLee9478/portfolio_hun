#!/usr/bin/env node

/**
 * Production Start Script
 * This script starts the production server
 */

import { existsSync } from 'fs';
import { spawn } from 'child_process';
import path from 'path';

console.log('🚀 Starting production server...');

// Check if build exists
if (!existsSync('dist/index.js')) {
  console.error('❌ Production build not found. Please run: node build.js');
  process.exit(1);
}

// Set production environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';
process.env.HOST = process.env.HOST || '0.0.0.0';

console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
console.log(`📡 Server will start on: ${process.env.HOST}:${process.env.PORT}`);

try {
  // Start the production server
  const server = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    env: process.env
  });

  // Handle server shutdown gracefully
  process.on('SIGTERM', () => {
    console.log('📴 Received SIGTERM, shutting down gracefully...');
    server.kill('SIGTERM');
  });

  process.on('SIGINT', () => {
    console.log('📴 Received SIGINT, shutting down gracefully...');
    server.kill('SIGINT');
  });

  server.on('close', (code) => {
    console.log(`🔚 Server process exited with code ${code}`);
    process.exit(code);
  });

  server.on('error', (error) => {
    console.error('❌ Server error:', error);
    process.exit(1);
  });

} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}