# Deployment Guide

## Overview
This portfolio website is built with React and Vite, and is configured for automatic deployment to GitHub Pages.

## Automatic Deployment

### GitHub Actions
The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
1. Builds the React application
2. Copies the CNAME file for custom domain
3. Deploys to GitHub Pages

### Triggering Deployment
Deployment happens automatically when:
- Code is pushed to the `main` branch
- Manual workflow dispatch is triggered from GitHub Actions tab

## Manual Deployment

If you need to deploy manually:

```bash
# Build the production bundle
npm run build

# The output will be in the dist/ folder
# Copy CNAME to dist if using custom domain
cp CNAME dist/

# Deploy the dist/ folder to GitHub Pages
# (Use your preferred method: gh-pages package, manual upload, etc.)
```

## Custom Domain Configuration

The site is configured for the custom domain `david-strikaitis.com`:
- CNAME file is included in the repository root
- CNAME file is automatically copied to dist/ during build
- GitHub Pages settings should point to the custom domain

## Repository Settings

For GitHub Pages to work correctly, ensure:
1. Go to Settings > Pages
2. Source should be set to "GitHub Actions"
3. Custom domain field should show `david-strikaitis.com`

## Verification

After deployment:
1. Visit https://david-strikaitis.com
2. Check that all sections load correctly
3. Verify images and videos display properly
4. Test navigation and modal interactions
5. Test on mobile devices

## Troubleshooting

### Images not loading
- Check that image paths use `/src/assets/imgs/` format
- Verify all images are committed to the repository

### 404 errors
- Ensure the build completed successfully
- Check that CNAME file is present in the deployed dist/ folder

### Deployment failed
- Check GitHub Actions logs for error messages
- Verify Node.js version compatibility (requires Node 18+)
- Ensure npm dependencies install correctly

## Performance

- Production build is optimized and minified
- Total bundle size: ~424KB
- JavaScript bundle: ~390KB (gzipped: ~127KB)
- CSS bundle: ~13KB (gzipped: ~3KB)
- First load is fast, subsequent navigation is instant

## Monitoring

Monitor the following after deployment:
- GitHub Actions workflow success/failure
- Site accessibility at custom domain
- Console errors in browser DevTools
- Mobile responsiveness
- Animation performance
