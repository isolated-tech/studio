#!/bin/bash

# Patch the built files to work in static mode

echo "Patching static build for isolated.tech deployment..."

DEMO_DIR="/Users/codybontecou/dev/isotech/isolated.tech/studio/public/i18n/demo"

# Create builds/meta directory if it doesn't exist
mkdir -p "$DEMO_DIR/_nuxt/builds/meta"

# Create a dummy build meta file to prevent 404 errors
echo '{"id":"static","timestamp":1754790886170}' > "$DEMO_DIR/_nuxt/builds/latest.json"
echo '{"id":"static","timestamp":1754790886170}' > "$DEMO_DIR/_nuxt/builds/meta/b44f119c-860a-4668-bd35-244787c9aa26.json"

# Remove Vercel rewrite since we have actual static files now
cat > /Users/codybontecou/dev/isotech/isolated.tech/studio/vercel.json << 'EOF'
{
  "trailingSlash": false
}
EOF

echo "Patching complete!"