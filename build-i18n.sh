#!/bin/bash

# Build script to integrate i18nlocale into isolated.tech

echo "Building i18nlocale project..."

# Navigate to i18n-ai directory and build
cd /Users/codybontecou/dev/i18n-ai

# Build the Nuxt project
npm run build

# Create the i18n/demo directory in public folder of isolated.tech
mkdir -p /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo

# Copy the built files to the public directory
cp -r .output/public/* /Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo/

echo "i18nlocale has been built and copied to /public/i18n/demo"
echo "The site will be available at https://isolated.tech/i18n/demo after deployment"