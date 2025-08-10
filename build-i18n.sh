#!/bin/bash

# Build script to integrate i18nlocale into isolated.tech

echo "Building i18nlocale project..."

# Navigate to i18n-ai directory and build
cd /Users/codybontecou/dev/i18n-ai

# Generate static site with Nuxt
npm run generate

# Remove old build if exists
rm -rf /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n

# Create the i18n/demo directory in public folder of isolated.tech
mkdir -p /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo

# Copy all generated files including _nuxt directory
if [ -d ".output/public" ]; then
    # Use rsync for better handling of all files including hidden ones
    rsync -av .output/public/ /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/
else
    echo "Error: .output/public directory not found!"
    exit 1
fi

# Also copy the _nuxt folder from dist if it exists there
if [ -d ".nuxt/dist/client" ]; then
    echo "Copying client assets..."
    mkdir -p /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/_nuxt
    cp -r .nuxt/dist/client/* /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/_nuxt/
fi

echo "Build complete! Files copied to /public/i18n/demo"
echo "The site will be available at https://isolated.tech/i18n/demo after deployment"