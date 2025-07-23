#!/usr/bin/env node
/**
 * Production Start Script
 * Starts the server with proper error handling and environment setup
 */

import { existsSync } from 'fs';
import { spawn } from 'child_process';
import path from 'path';

const SERVER_FILE = 'dist/index.js';
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting production server...');

// Check if build exists
if (!existsSync(SERVER_FILE)) {
  console.error('❌ Server build not found. Please run build first.');
  console.log('Run: npm run build');
  process.exit(1);
}

// Set production environment
process.env.NODE_ENV = 'production';

// Start server
const server = spawn('node', [SERVER_FILE], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: PORT
  }
});

server.on('error', (err) => {
  console.error('❌ Server start error:', err);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGTERM');
});

console.log(`✅ Server starting on port ${PORT}`);