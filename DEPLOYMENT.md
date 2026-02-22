# Deployment Guide

This guide covers deploying ScrolLearn to production across different platforms.

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database backups available
- [ ] API documentation updated
- [ ] Code reviewed and approved
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] Logging configured

## Backend Deployment

### Option 1: Heroku

```bash
# Create app
heroku create scrollearn-api

# Set environment variables
heroku config:set DATABASE_URL=postgresql://...
heroku config:set DEBUG=False

# Deploy
git push heroku main
```

### Option 2: Docker + AWS ECS

```bash
# Build Docker image
docker build -f Dockerfile -t scrollearn-backend:latest .

# Tag for ECR
docker tag scrollearn-backend:latest <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/scrollearn-backend:latest

# Login to ECR
aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com

# Push image
docker push <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/scrollearn-backend:latest

# Deploy to ECS via AWS Console
```

### Option 3: DigitalOcean App Platform

```bash
# Create app.yaml
name: scrollearn-api
services:
- name: api
  github:
    branch: main
    repo: your-repo
  build_command: pip install -r requirements.txt
  run_command: uvicorn app.main:app --host 0.0.0.0 --port 8080
  envs:
  - key: DATABASE_URL
    value: ${db.connection_string}
    scope: RUN_AND_BUILD_TIME
databases:
- name: db
  engine: PG
  version: "14"
```

### Option 4: Railway

```bash
# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

## Frontend Web Deployment

### Option 1: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend-web
vercel

# Configure environment variables in Vercel dashboard
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend-web
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: CloudFlare Pages

```bash
# Build
cd frontend-web
npm run build

# Deploy via GitHub or drag-and-drop dist folder
# Configure API URL in Vercel environment
```

### Option 4: AWS S3 + CloudFront

```bash
# Build
cd frontend-web
npm run build

# Create S3 bucket
aws s3 mb s3://scrollearn-web

# Upload files
aws s3 sync dist/ s3://scrollearn-web

# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config file://distribution-config.json
```

## Mobile App Deployment

### iOS App Store

```bash
# Prerequisites
- Apple Developer Account
- Xcode with iOS SDK

# Build
cd frontend-mobile/ios
xcodebuild -workspace ScrolLearnMobile.xcworkspace \
  -scheme ScrolLearnMobile \
  -configuration Release \
  -archivePath ./ScrolLearn.xcarchive archive

# Archive and export
xcodebuild -exportArchive \
  -archivePath ./ScrolLearn.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath ./build

# Upload via Transporter or Xcode
```

### Google Play Store

```bash
# Prerequisites
- Google Play Developer Account
- Keystore file

# Build signed APK
cd frontend-mobile/android
./gradlew bundleRelease

# Upload bundle
# Visit Play Console > Internal testing > Upload new bundle
```

## Environment Variables - Production

### Backend

Create `.env` for production:

```env
DATABASE_URL=postgresql://user:pass@host:5432/scrollearn
HOST=0.0.0.0
PORT=8000
DEBUG=False
ALLOWED_ORIGINS=https://scrollearn.com,https://app.scrollearn.com
LOG_LEVEL=info
WORKERS=4
```

### Frontend Web

Create `.env.production`:

```env
VITE_API_URL=https://api.scrollearn.com
```

### Vercel Environment Variables

```
VITE_API_URL = https://api.scrollearn.com
```

## Database Migration

### From SQLite to PostgreSQL

```bash
# Dump from SQLite
sqlite3 scrollearn.db ".dump" > dump.sql

# Connect to PostgreSQL
psql -U user -d scrollearn < dump.sql

# Update DATABASE_URL
DATABASE_URL=postgresql://user:pass@host/scrollearn
```

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy ScrolLearn

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.13.15
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "scrollearn-api"
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: frontend-web
```

## Monitoring

### Backend Monitoring

- **Error tracking**: Sentry
- **Performance**: New Relic or DataDog
- **Logs**: CloudWatch or ELK Stack
- **Uptime**: Pingdom or StatusPage

### Frontend Monitoring

- **Performance**: Google Analytics, Sentry
- **Error tracking**: Sentry
- **User analytics**: Mixpanel, Amplitude

### Mobile Analytics

- **Firebase Analytics**
- **Sentry for crashes**
- **App Store Analytics**

## Scaling

### Horizontal Scaling

1. **Backend**:
   - Use load balancer (AWS ALB, Nginx)
   - Multiple API instances
   - Database replication

2. **Frontend**:
   - CDN (CloudFront, Fastly)
   - Edge caching
   - Already scales automatically (static)

3. **Mobile**:
   - Scale purely on backend
   - Mobile app is distributed via store

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Upgrade database tier
- Optimize database queries

## Security Checklist

- [ ] HTTPS enabled everywhere
- [ ] CORS properly configured
- [ ] Input validation everywhere
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens implemented
- [ ] Rate limiting enabled
- [ ] API authentication added
- [ ] Sensitive data encrypted
- [ ] Regular backups enabled
- [ ] SSL certificates up to date
- [ ] Security headers configured

### Security Headers

```nginx
# Add to Nginx/CloudFront
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Cost Optimization

- Use CDN for static content
- Enable database connection pooling
- Use auto-scaling
- Monitor and optimize queries
- Use serverless for functions if applicable
- Consider reserved instances

## Backup & Recovery

### Database Backups

```bash
# PostgreSQL
pg_dump scrollearn > backup.sql

# Automated with cron
0 2 * * * pg_dump scrollearn > /backups/scrollearn_$(date +\%Y\%m\%d).sql

# S3 upload
aws s3 cp backup.sql s3://scrollearn-backups/
```

### Recovery Plan

1. Restore from latest backup
2. Run database migrations
3. Clear caches
4. Restart services
5. Verify data integrity

## Post-Deployment

- [ ] Test all features
- [ ] Monitor error rates
- [ ] Check response times
- [ ] Verify backups
- [ ] Update documentation
- [ ] Notify users
- [ ] Monitor for 24 hours

## Rollback Plan

If issues occur in production:

```bash
# Revert to previous version
git revert HEAD
git push origin main

# Database rollback if needed
psql scrollearn < previous_backup.sql

# Clear caches
redis-cli FLUSHALL
```

## Support

For deployment help:

1. Check platform documentation
2. Review error logs
3. Check health endpoints
4. Contact DevOps team

## Version Control

Tag releases:

```bash
git tag -a v1.0.0 -m "Version 1.0.0 - Initial Release"
git push origin v1.0.0
```

---

For specific platform help, consult their documentation.
