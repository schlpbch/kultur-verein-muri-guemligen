#!/bin/bash

# Deploy script for Kulturverein Muri-Gümligen website to Netlify

set -e

echo "🚀 Starting deployment to Netlify..."

# Build the project
echo "📦 Building project..."
pnpm build

# Deploy to Netlify
echo "📤 Deploying to Netlify..."
netlify deploy --prod

echo "✅ Deployment complete!"
