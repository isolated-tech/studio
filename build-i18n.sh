#!/bin/bash

# Build script to integrate i18nlocale into isolated.tech

echo "Building i18nlocale project..."

# Navigate to i18n-ai directory and build
cd /Users/codybontecou/dev/i18n-ai

# Generate static site with Nuxt
npm run generate

# Remove old build if exists
rm -rf /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo

# Create the i18n/demo directory in public folder of isolated.tech
mkdir -p /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo

# Copy the generated files to the public directory
cp -r .output/public/* /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/

# Create index.html if it doesn't exist by copying from a subpage
if [ ! -f "/Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/index.html" ]; then
    echo "Creating index.html..."
    # Try to find an HTML file to use as template
    if [ -f ".output/public/index.html" ]; then
        cp .output/public/index.html /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/
    elif [ -f "/Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/blog/index.html" ]; then
        # Copy and modify the blog index as a fallback
        cp /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/blog/index.html /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/
    fi
fi

echo "i18nlocale has been built and copied to /public/i18n/demo"
echo "The site will be available at https://isolated.tech/i18n/demo after deployment"