#\!/bin/bash

# Test the live contact form endpoint
curl -X POST https://isolated.tech/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "phone": "555-1234",
    "message": "This is a test message to verify email sending is working",
    "budget": "50"
  }' \
  -v

