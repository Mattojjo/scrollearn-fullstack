# Deployment Guide

⚠️ **Work in Progress / Dusty Zone** - Experimental deployment guide for ScrolLearn.

Note: This is an early-stage project. Deployment to production is not recommended yet. Use for development and testing only.

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database backups ready
- [ ] HTTPS configured
- [ ] CORS allowed for testing domains
- [ ] Error logging setup
- [ ] Monitoring configured
- [ ] Authentication not yet required

---

## Backend Deployment

### Using Render (Recommended for Beginners)

1. Push code to GitHub
2. Sign up at render.com
3. Create new Web Service
4. Connect GitHub repository
5. Set environment variables:
   ```
   DATABASE_URL=postgresql://...
   ENVIRONMENT=testing
   DEBUG=False
   ```
6. Deploy

Backend available at: `https://your-service.onrender.com`

### Using Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Create project: `railway init`
4. Add PostgreSQL plugin
5. Deploy: `railway up`

### Using Heroku (with Procfile)

Create `Procfile`:

```
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
worker: celery -A app.tasks worker
```

Then:

```bash
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Using AWS Lambda + RDS

1. Create RDS PostgreSQL instance
2. Package backend as Lambda function
3. Use API Gateway for HTTP endpoints
4. Configure environment variables in Lambda

### Using DigitalOcean App Platform

1. Sign up at digitalocean.com
2. Create new App
3. Connect GitHub
4. Configure:
   - Runtime: Python 3.12
   - Command: `uvicorn app.main:app --host 0.0.0.0 --port 8080`
5. Add PostgreSQL database
6. Deploy

---

## Frontend Web Deployment

### Using Vercel (Free, Recommended)

1. Sign up at vercel.com
2. Connect GitHub repository
3. Configure build:
   ```
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
4. Set environment variable:
   ```
   VITE_API_URL=https://your-backend.com
   ```
5. Deploy (automatic on push)

### Using Netlify

1. Sign up at netlify.com
2. Connect GitHub
3. Set build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable in Netlify UI
6. Deploy

### Using GitHub Pages

1. Add to `vite.config.js`:

   ```javascript
   export default {
     base: "/repo-name/",
     // ... rest of config
   };
   ```

2. Add GitHub Actions workflow `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

### Using AWS S3 + CloudFront

1. Build locally: `npm run build`
2. Create S3 bucket
3. Upload `dist/` contents to S3
4. Configure CloudFront distribution
5. Point domain to CloudFront

---

## Mobile Deployment

### iOS (App Store)

Requires:

- Apple Developer account ($99/year)
- Mac with Xcode

Process:

```bash
cd frontend-mobile

# Build for testing
npm run build:ios

# Archive in Xcode
# Upload to TestFlight
# Submit for review
```

### Android (Google Play)

Requires:

- Google Play Developer account ($25 one-time)

Process:

```bash
cd frontend-mobile

# Build signed APK/AAB
npm run build:android

# Or use Expo:
eas build --platform android --auto-submit
```

---

## Environment Configuration

### Backend Testing (.env)

```env
DATABASE_URL=postgresql://user:password@host:5432/scrollearn
ENVIRONMENT=testing
DEBUG=False
LOG_LEVEL=INFO
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
JWT_SECRET=your-secret-key-here-change-this
```

### Web Frontend (.env)

```env
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
```

### Mobile (environment.ts)

```typescript
const ENV = {
  testing: {
    apiUrl: "https://api.yourdomain.com",
    logLevel: "error",
  },
  development: {
    apiUrl: "http://localhost:8000",
    logLevel: "debug",
  },
};
```

---

## Database Setup

### PostgreSQL for Testing

1. Create database:

   ```bash
   createdb scrollearn
   ```

2. Create user:

   ```bash
   createuser scrollearn_user
   psql -c "ALTER USER scrollearn_user WITH PASSWORD 'secure-password';"
   ```

3. Grant permissions:

   ```bash
   psql -c "GRANT ALL PRIVILEGES ON DATABASE scrollearn TO scrollearn_user;"
   ```

4. Set connection string:
   ```
   DATABASE_URL=postgresql://scrollearn_user:password@localhost:5432/scrollearn
   ```

### Backup Strategy

Daily backups:

```bash
pg_dump scrollearn | gzip > backup-$(date +%Y%m%d).sql.gz
```

Store backups off-site (AWS S3, Google Cloud Storage, etc.)

---

## SSL/HTTPS Configuration

### Using Let's Encrypt

```bash
# Install certbot
sudo apt-get install certbot

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renew
sudo certbot renew --dry-run
```

### Nginx Configuration Example

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location /api/ {
        proxy_pass http://backend:8000;
    }

    location / {
        proxy_pass http://frontend:3000;
    }
}
```

---

## Monitoring & Logging

### Application Monitoring

Tools to consider:

- New Relic
- Datadog
- Sentry (error tracking)
- LogRocket (frontend)

### Log Aggregation

Centralize logs:

- ELK Stack (Elasticsearch, Logstash, Kibana)
- Splunk
- CloudWatch (AWS)
- Stackdriver (Google Cloud)

---

## Performance Optimization

### Backend

- Enable caching headers
- Use database connection pooling
- Implement rate limiting
- Database query optimization

### Frontend

- Code splitting (automatic with Vite)
- Image optimization
- Minification (automatic build)
- CDN distribution

### Mobile

- Code splitting
- Image caching
- Lazy loading
- Profiling optimization

---

## CI/CD Pipeline

### GitHub Actions Example

`.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: 3.12
      - run: pip install -r backend/requirements.txt
      - run: pytest backend/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run build:all
      - uses: actions/upload-artifact@v3
        with:
          name: build
          path: |
            backend/
            frontend-web/dist/
            frontend-mobile/
```

---

## Rollback Strategy

### Backend

Keep previous versions:

```bash
# Tag release
git tag v1.0.1
git push origin v1.0.1

# Rollback to previous
git checkout v1.0.0
```

### Frontend

Maintain previous builds in CDN, quick switch.

### Database

Always backup before migration:

```bash
pg_dump scrollearn > backup.sql
# Then run migrations
alembic upgrade head
```

---

## Security Considerations

- Change default passwords
- Use environment variables for secrets
- Enable HTTPS/SSL
- Configure CORS appropriately
- Implement rate limiting
- Add authentication (JWT/OAuth)
- Regular security updates
- SQL injection prevention (SQLAlchemy handles this)
- CSRF protection if needed
- Content Security Policy headers

---

## Health Checks

Configure monitoring endpoints:

Backend:

```
http://api.yourdom.com/health
```

Frontend:

```
http://app.yourdomain.com/
```

---

## Cost Estimation (Monthly)

| Service             | Cost      | Notes              |
| ------------------- | --------- | ------------------ |
| Render Backend      | $7        | Hobby tier         |
| Vercel Frontend     | Free      | Includes free tier |
| PostgreSQL Database | $15       | Render included    |
| Domain              | $12       | Annual             |
| **Total**           | ~$5/month | Very low cost      |

---

## Next Steps

1. Choose hosting provider
2. Setup database
3. Configure environment variables
4. Deploy backend first
5. Deploy frontend
6. Test all endpoints
7. Setup monitoring
8. Configure SSL
9. Setup CI/CD

---

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [nginx Documentation](https://nginx.org/en/docs/)
