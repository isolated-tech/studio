#!/bin/bash

# Replace with your actual Cloudflare Pages URL
SITE_URL="https://YOUR_SITE.pages.dev"

curl -X POST "$SITE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "phone": "555-1234",
    "message": "This is a test message from cURL",
    "budget": "50"
  }' \
  -v