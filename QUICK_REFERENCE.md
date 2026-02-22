# Quick Reference Guide

## Quick Start

```bash
# Terminal 1: Backend
cd backend

# Create venv with Python 3.12 (or 3.11)
python3.12 -m venv venv

source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Terminal 2: Web Frontend
cd frontend-web
npm install
npm run dev

# Terminal 3: Mobile (optional)
cd frontend-mobile
npm install
npm start
```

⚠️ **Note:** Use Python 3.12 or 3.11. Python 3.14+ has build issues with pydantic-core.

## API Endpoints

### Base URL

Development: `http://localhost:8000`

### Items

| Method | Endpoint    | Purpose       |
| ------ | ----------- | ------------- |
| GET    | /items/     | Get all cards |
| POST   | /items/     | Create card   |
| GET    | /items/{id} | Get card      |
| PUT    | /items/{id} | Update card   |
| DELETE | /items/{id} | Delete card   |

### System

| Method | Endpoint | Purpose           |
| ------ | -------- | ----------------- |
| GET    | /        | Health check      |
| GET    | /health  | Status check      |
| GET    | /docs    | API documentation |

## Port Reference

| Service       | Port | URL                        |
| ------------- | ---- | -------------------------- |
| Backend API   | 8000 | http://localhost:8000      |
| API Docs      | 8000 | http://localhost:8000/docs |
| Web Frontend  | 5173 | http://localhost:5173      |
| Metro Bundler | 8081 | (Mobile)                   |

## File Structure Quick Reference

### Backend

```
backend/
├── app/main.py          # FastAPI app
├── app/database.py      # DB setup
├── app/models.py        # Data models
├── app/schemas.py       # Validators
├── app/routes/items.py  # API endpoints
└── requirements.txt     # Dependencies
```

### Web Frontend

```
frontend-web/
├── src/App.jsx          # Main component
├── src/components/      # React components
├── package.json         # Dependencies
├── vite.config.js       # Vite config
└── tailwind.config.js   # Tailwind config
```

### Mobile

```
frontend-mobile/
├── src/App.tsx          # Navigation
├── src/screens/         # Screen components
├── src/components/      # UI components
├── src/utils/api.ts     # API client
├── package.json         # Dependencies
└── app.json             # App config
```

## Common Commands

### Backend

```bash
# Start development server
uvicorn app.main:app --reload

# Start on specific port
uvicorn app.main:app --port 8001 --reload

# Build/format database
# (auto-created on startup)
```

### Web

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### Mobile

```bash
# Install dependencies
npm install

# Start bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Reset cache
npm start -- --reset-cache
```

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=sqlite:///./scrollearn.db
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

### Frontend Web (src/App.jsx)

```javascript
const API_BASE_URL = `http://${window.location.hostname}:8000`;
```

### Mobile (src/utils/api.ts)

```typescript
const API_BASE_URL = "http://localhost:8000";
// Android emulator: 'http://10.0.2.2:8000'
```

## Helpful URLs

- **API Docs**: http://localhost:8000/docs
- **Web App**: http://localhost:5173
- **GitHub**: Repository URL
- **Issues**: GitHub Issues

## Debugging Tips

### Backend

- Check `/docs` for API errors
- Look at terminal output for error messages
- Use `tail -f` on debug logs

### Web Frontend

- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for JavaScript errors

### Mobile

- View Metro bundler terminal output
- Use React DevTools if available
- Check device console/logs

## Common Issues & Solutions

| Issue                  | Solution                                                      |
| ---------------------- | ------------------------------------------------------------- |
| Port already in use    | Kill process: `lsof -i :PORT` then `kill -9 PID`              |
| Backend not connecting | Check if running on 8000: `curl http://localhost:8000/health` |
| Frontend not loading   | Verify backend is running, check CORS                         |
| Mobile Can't connect   | Use `10.0.2.2` for Android emulator                           |
| npm install fails      | Clear cache: `npm cache clean --force`                        |

## Branch Naming

```
feature/description     # New features
fix/description         # Bug fixes
docs/description        # Documentation
chore/description       # Maintenance
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat(backend): add new endpoint"

# Push and create PR
git push origin feature/my-feature
```

## Testing

### Manual Testing Checklist

- [ ] Create card
- [ ] View card
- [ ] Edit card
- [ ] Delete card
- [ ] Backend health check
- [ ] Web frontend loads
- [ ] Mobile app connects

## Performance Tips

- Enable production mode builds before deploying
- Use database indexes for frequently queried fields
- Implement caching for static assets
- Minimize API calls in frontend
- Use image optimization

## Security Reminders

- Never commit `.env` files
- Use environment variables for secrets
- Validate input on both client and server
- Use HTTPS in production
- Keep dependencies updated

## Documentation Links

- [Main README](./README.md)
- [Setup Guide](./SETUP.md)
- [Backend README](./backend/README.md)
- [Web Frontend README](./frontend-web/README.md)
- [Mobile README](./frontend-mobile/README.md)
- [Contributing](./CONTRIBUTING.md)

## Support & Help

1. Check error messages
2. Review README files
3. Check API documentation (/docs)
4. Review browser/terminal console
5. Create GitHub issue if stuck

## Version Info

- Backend API: v1.0.0
- Frontend Web: v1.0.0
- Frontend Mobile: v1.0.0
- Node.js: 18+
- Python: 3.11+

---

Last Updated: February 22, 2026
