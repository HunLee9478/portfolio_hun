#!/usr/bin/env node
/**
 * Deployment Script
 * Handles different deployment scenarios
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import path from 'path';

const DEPLOYMENT_TYPE = process.env.DEPLOYMENT_TYPE || 'static';

console.log(`🚀 Starting ${DEPLOYMENT_TYPE} deployment...`);

try {
  // Run build first
  console.log('📦 Building project...');
  execSync('node build.js', { stdio: 'inherit' });

  switch (DEPLOYMENT_TYPE) {
    case 'static':
      deployStatic();
      break;
    case 'vercel':
      deployVercel();
      break;
    case 'netlify':
      deployNetlify();
      break;
    case 'github-pages':
      deployGitHubPages();
      break;
    default:
      console.log('✅ Build completed. Ready for manual deployment.');
      console.log('Available files:');
      console.log('- dist/public/ (static files)');
      console.log('- dist/index.js (server)');
      console.log('- dist/assets/ (assets)');
  }

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

function deployStatic() {
  console.log('📋 Preparing static deployment...');
  
  // Create static-specific files
  const staticFiles = [
    {
      path: 'dist/public/_headers',
      content: `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable`
    },
    {
      path: 'dist/public/_redirects',
      content: `/*    /index.html   200`
    }
  ];

  staticFiles.forEach(file => {
    writeFileSync(file.path, file.content);
    console.log(`✅ Created ${file.path}`);
  });

  console.log('✅ Static deployment ready!');
  console.log('Upload the dist/public/ folder to your static hosting service.');
}

function deployVercel() {
  console.log('🔷 Deploying to Vercel...');
  
  // Create vercel.json
  const vercelConfig = {
    "version": 2,
    "builds": [
      {
        "src": "dist/index.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/assets/(.*)",
        "dest": "/dist/assets/$1"
      },
      {
        "src": "/(.*)",
        "dest": "/dist/index.js"
      }
    ]
  };

  writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
  console.log('✅ Created vercel.json');

  try {
    execSync('vercel --prod', { stdio: 'inherit' });
    console.log('✅ Deployed to Vercel!');
  } catch (error) {
    console.log('📝 Vercel config created. Run: vercel --prod');
  }
}

function deployNetlify() {
  console.log('🟢 Preparing Netlify deployment...');
  
  // Create netlify.toml
  const netlifyConfig = `[build]
  command = "node build.js"
  publish = "dist/public"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;

  writeFileSync('netlify.toml', netlifyConfig);
  console.log('✅ Created netlify.toml');
  console.log('✅ Netlify deployment ready!');
  console.log('Connect your GitHub repo to Netlify for automatic deployments.');
}

function deployGitHubPages() {
  console.log('🐙 Deploying to GitHub Pages...');
  
  try {
    execSync('npx gh-pages -d dist/public', { stdio: 'inherit' });
    console.log('✅ Deployed to GitHub Pages!');
  } catch (error) {
    console.log('📝 GitHub Pages config ready. Run: npx gh-pages -d dist/public');
  }
}