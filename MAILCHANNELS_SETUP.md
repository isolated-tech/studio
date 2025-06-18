# MailChannels Setup for Cloudflare Pages

## DNS Configuration Required

For MailChannels to work with your domain on Cloudflare Pages, you need to add a DNS TXT record:

### Add this TXT record in Cloudflare DNS:

**Type:** TXT  
**Name:** `_mailchannels`  
**Content:** `v=mc1 cfid=isolated.tech`

Or if you're using a specific account:
```
v=mc1 cfid=YOUR_CLOUDFLARE_ACCOUNT_NAME.pages.dev
```

### Steps to add the record:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain `isolated.tech`
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - Type: `TXT`
   - Name: `_mailchannels`
   - Content: `v=mc1 cfid=isolated.tech`
   - TTL: Auto
6. Save

### Alternative: SPF Record

If the above doesn't work, try adding MailChannels to your SPF record:

Update your existing SPF record to include MailChannels:
```
v=spf1 include:_spf.mx.cloudflare.net include:_spf.mailchannels.net ~all
```

## Verify Setup

After adding the DNS record and deploying:

1. Submit a test form
2. Check Cloudflare Pages Functions logs
3. Look for:
   - 202 status = Success
   - 403 status = Domain verification needed
   - Other errors = Check logs

## Troubleshooting

If emails aren't sending:

1. **Check Function Logs**: Look for the specific error message
2. **Verify DNS**: Ensure the TXT record is properly set
3. **Test with curl**:
   ```bash
   curl -X POST https://isolated.tech/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

## Alternative Solutions

If MailChannels doesn't work, consider:

1. **Resend.com** - Modern email API (requires API key)
2. **SendGrid** - Reliable email service (requires API key)
3. **Web3Forms** - Free form endpoint service
4. **Formspree** - Form backend service