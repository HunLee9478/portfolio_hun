#!/usr/bin/env node
/**
 * Cleanup Script
 * Removes build artifacts and temporary files
 */

import { rmSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const pathsToClean = [
  'dist',
  'node_modules/.cache',
  '.vite',
  'logs',
  'temp',
  'tmp'
];

console.log('🧹 Starting cleanup...');

pathsToClean.forEach(cleanPath => {
  if (existsSync(cleanPath)) {
    try {
      rmSync(cleanPath, { recursive: true, force: true });
      console.log(`✅ Removed ${cleanPath}`);
    } catch (error) {
      console.log(`❌ Failed to remove ${cleanPath}: ${error.message}`);
    }
  } else {
    console.log(`⚪ ${cleanPath} not found, skipping`);
  }
});

// Clean npm cache
try {
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ Cleaned npm cache');
} catch (error) {
  console.log('❌ Failed to clean npm cache');
}

console.log('✅ Cleanup completed!');