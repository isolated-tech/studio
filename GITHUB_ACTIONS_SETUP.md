# GitHub Actions Setup for Cloudflare Pages

This guide explains how to set up GitHub Actions for automatic deployment to Cloudflare Pages.

## Prerequisites

You need to add two secrets to your GitHub repository:
1. `CLOUDFLARE_API_TOKEN`
2. `CLOUDFLARE_ACCOUNT_ID`

## Step 1: Get Your Cloudflare Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account
3. In the right sidebar, you'll see your **Account ID**
4. Copy this value

## Step 2: Create a Cloudflare API Token

1. Go to [My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **Custom token** template
4. Configure the token:
   - **Token name**: `GitHub Actions - isolated.tech`
   - **Permissions**:
     - Account → Cloudflare Pages:Read
     - Account → Cloudflare Pages:Edit
   - **Account Resources**: Include → Your account
   - **Client IP Address Filtering**: (optional, leave blank)
   - **TTL**: (optional, leave blank)
5. Click **Continue to summary**
6. Click **Create Token**
7. **Copy the token** (you won't be able to see it again!)

## Step 3: Add Secrets to GitHub

1. Go to your GitHub repository: https://github.com/isolated-tech/studio
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

### Secret 1: CLOUDFLARE_ACCOUNT_ID
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Value**: Your account ID from Step 1

### Secret 2: CLOUDFLARE_API_TOKEN
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Value**: Your API token from Step 2

## Step 4: Test the Deployment

1. Make a commit to the `main` branch
2. Go to the **Actions** tab in your GitHub repository
3. You should see the workflow running
4. Once complete, your site will be deployed to Cloudflare Pages

## How It Works

- **Push to `main`**: Deploys to production
- **Pull Requests**: Creates preview deployments
- **Build logs**: Available in GitHub Actions
- **Deployment status**: Shows on pull requests

## Environment Variables

The workflow automatically uses the environment variables configured in your Cloudflare Pages project settings.

## Troubleshooting

If deployment fails:
1. Check the GitHub Actions logs
2. Verify your API token has the correct permissions
3. Ensure the `projectName: studio` matches your Cloudflare Pages project name
4. Check that the build output directory `out` is correct