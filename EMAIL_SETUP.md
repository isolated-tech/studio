# Email Setup for isolated.tech

## Overview

This document explains how email is configured for isolated.tech using Cloudflare Email Routing and MailChannels for sending.

## Email Addresses

### Receiving Email (via Cloudflare Email Routing)

The following email addresses are configured to forward to personal/team inboxes:

- `cody@isolated.tech` - CEO/Founder
- `support@isolated.tech` - Customer support
- `hello@isolated.tech` - General inquiries
- `press@isolated.tech` - Press inquiries
- `noreply@isolated.tech` - Automated emails (no forwarding)

### Sending Email (via MailChannels)

The contact form sends emails using MailChannels integration with Cloudflare Pages:
- FROM: `noreply@isolated.tech`
- TO: `support@isolated.tech` (or configured in TO_EMAIL env var)
- REPLY-TO: Set to the form submitter's email

## Setup Instructions

### 1. Enable Cloudflare Email Routing

1. Log in to Cloudflare Dashboard
2. Select the `isolated.tech` domain
3. Go to Email → Email Routing
4. Click "Get started" and follow the wizard
5. Cloudflare will automatically add MX records

### 2. Create Email Forwarding Rules

In Email Routing → Routing rules:
1. Click "Create address"
2. Enter the custom address (e.g., `cody`)
3. Enter the destination email where it should forward
4. Click "Save"

### 3. Configure DNS Records

Add these DNS records in Cloudflare:

```
# SPF Record (allows Cloudflare to send email)
Type: TXT
Name: @
Content: v=spf1 include:_spf.mx.cloudflare.net ~all

# DMARC Record (email authentication policy)
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none; rua=mailto:dmarc@isolated.tech
```

### 4. Update Environment Variables

In Cloudflare Pages settings, update:
- `FROM_EMAIL`: `noreply@isolated.tech`
- `TO_EMAIL`: `support@isolated.tech`

## Email Workflow

1. **Contact Form Submission**
   - User fills out form at `/contact`
   - Form data sent to Cloudflare Pages Function
   - MailChannels sends email from `noreply@isolated.tech`
   - Email delivered to `support@isolated.tech`
   - Reply-To header set to user's email

2. **Direct Email**
   - Someone emails `support@isolated.tech`
   - Cloudflare Email Routing receives it
   - Forwards to configured personal inbox
   - Reply from personal inbox appears as `support@isolated.tech`

## Limitations

- **Sending**: Can only send automated emails (via MailChannels)
- **No SMTP**: Cannot use email clients to send as @isolated.tech
- **Forwarding Only**: Cloudflare Email Routing only forwards, doesn't host mailboxes

## Alternative: Full Email Hosting

For full email capabilities (sending from email clients), consider:
- Google Workspace
- Microsoft 365
- Zoho Mail
- ProtonMail Business

These services provide SMTP access for sending emails from any client.