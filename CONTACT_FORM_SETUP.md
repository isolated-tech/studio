# Contact Form Setup with Cloudflare Pages

This guide explains how to deploy and configure the contact form with Cloudflare Pages.

## Overview

The contact form uses Cloudflare Pages Functions to handle form submissions and Cloudflare's MailChannels integration for sending emails.

## Setup Instructions

### 1. Deploy to Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/` (or your project path)

### 2. Environment Variables

In your Cloudflare Pages dashboard, add these environment variables:

- `TO_EMAIL`: The email address where form submissions should be sent (e.g., `support@isolated.tech`)
- `FROM_EMAIL`: The email address that will appear as the sender (e.g., `noreply@isolated.tech`)

### 3. Email Domain Configuration

For the email sending to work properly with MailChannels:

1. Ensure your domain is added to Cloudflare
2. Add the following DNS records:
   - SPF record: `TXT @ "v=spf1 include:_spf.mx.cloudflare.net ~all"`
   - Domain verification (if required by MailChannels)

### 4. Testing

After deployment:

1. Navigate to your `/contact` page
2. Fill out the form and submit
3. Check the browser console for any errors
4. Verify the email is received at your configured `TO_EMAIL` address

## How It Works

1. User fills out the contact form at `/contact`
2. Form data is sent to `/api/contact` (Cloudflare Pages Function)
3. The function validates the data and uses MailChannels API to send the email
4. Success/error messages are displayed to the user

## File Structure

```
/functions/api/contact.js   # Cloudflare Pages Function
/src/app/contact/           # Contact page components
  ├── page.tsx             # Main contact page
  └── ContactForm.tsx      # Client-side form component
```

## Troubleshooting

- **Emails not sending**: Check Cloudflare Pages Functions logs in the dashboard
- **CORS errors**: The function includes CORS headers for cross-origin requests
- **Form validation errors**: Ensure all required fields (name, email, message) are filled

## Local Development

For local development, you can use Wrangler:

```bash
npm install -g wrangler
wrangler pages dev out
```

This will run your Pages Functions locally for testing.