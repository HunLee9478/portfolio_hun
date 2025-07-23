#!/usr/bin/env node
/**
 * Asset Optimization Script
 * Optimizes images and other assets for production
 */

import { readdirSync, statSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

const ASSETS_DIR = 'assets';
const DIST_ASSETS_DIR = 'dist/assets';

function optimizeAssets() {
  console.log('🎨 Starting asset optimization...');

  if (!existsSync(ASSETS_DIR)) {
    console.log('❌ Assets directory not found');
    return;
  }

  // Create dist assets directory
  if (!existsSync(DIST_ASSETS_DIR)) {
    mkdirSync(DIST_ASSETS_DIR, { recursive: true });
  }

  // Process each directory
  const directories = readdirSync(ASSETS_DIR);
  
  directories.forEach(dir => {
    const srcPath = path.join(ASSETS_DIR, dir);
    const destPath = path.join(DIST_ASSETS_DIR, dir);
    
    if (statSync(srcPath).isDirectory()) {
      console.log(`📁 Processing ${dir}...`);
      
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true });
      }
      
      const files = readdirSync(srcPath);
      
      files.forEach(file => {
        const srcFile = path.join(srcPath, file);
        const destFile = path.join(destPath, file);
        
        if (statSync(srcFile).isFile()) {
          const ext = path.extname(file).toLowerCase();
          
          try {
            if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
              // For now, just copy files
              // In the future, you could add image optimization here
              copyFileSync(srcFile, destFile);
              console.log(`✅ Copied ${file}`);
            } else {
              // Copy other files as-is
              copyFileSync(srcFile, destFile);
              console.log(`✅ Copied ${file}`);
            }
          } catch (error) {
            console.log(`❌ Failed to copy ${file}: ${error.message}`);
          }
        }
      });
    }
  });

  console.log('✅ Asset optimization completed!');
}

// Run asset optimization
optimizeAssets();