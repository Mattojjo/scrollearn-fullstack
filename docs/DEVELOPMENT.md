# Development Guide

Development workflow, available scripts, and best practices.

## Available Scripts

### Root Directory

Navigate to project root for global commands:

```bash
# Start all services at once (from root)
npm run start:all

# Build all services
npm run build:all

# Lint all services
npm run lint:all

# Clean build artifacts
npm run clean
```

### Backend Services

Navigate to `backend/` directory:

```bash
# Start development server with auto-reload
npm run backend:dev
# OR
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run database migrations (if applicable)
npm run backend:migrate

# Run tests
npm run backend:test

# Format code
npm run backend:format

# Type check (if using type hints)
npm run backend:types
```

### Web Frontend Services

Navigate to `frontend-web/` directory:

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint and format code
npm run lint
npm run format

# Run tests (if configured)
npm run test

# Type check
npm run type-check
```

### Mobile Services

Navigate to `frontend-mobile/` directory:

```bash
# Start Metro bundler
npm start

# Start on iOS simulator
npm run ios

# Start on Android emulator
npm run android

# Build Android APK (release)
npm run build:android

# Build iOS app (release)
npm run build:ios

# Lint code
npm run lint

# Format code
npm run format
```

---

## Development Workflow

### 1. Setup (First Time)

```bash
# Clone repository
git clone <repo-url>
cd scrollearn-fullstack

# Install all dependencies
npm run install:all

# Start all services
npm run start:all
```

### 2. Making Changes

#### Backend Changes

- Edit files in `backend/app/`
- Server auto-reloads on save
- Check API at `http://localhost:8000/docs`

#### Web Frontend Changes

- Edit files in `frontend-web/src/`
- Hot reload happens automatically
- Check browser at `http://localhost:5173`

#### Mobile Changes

- Edit files in `frontend-mobile/src/`
- Metro bundler recompiles on save
- Check emulator/device automatically

### 3. Testing Changes

```bash
# Test backend API
curl http://localhost:8000/items/

# Test web frontend
# Open http://localhost:5173 in browser

# Test mobile
# Use emulator or physical device
```

---

## Code Quality

### Linting

Check code style:

```bash
npm run lint:all
```

Fix issues automatically:

```bash
npm run format:all
```

### Type Checking

Web frontend:

```bash
cd frontend-web
npm run type-check
```

---

## Debugging

### Backend Debugging

1. Add breakpoints in IDE
2. Run with debugger:

```bash
python -m debugpy --listen 5678 -m uvicorn app.main:app --reload
```

### Web Frontend Debugging

1. Open DevTools: F12
2. Check Console for errors
3. Use React DevTools extension (recommended)
4. View network requests in Network tab

### Mobile Debugging

1. React Native Debugger (download separately)
2. Or use console output from terminal
3. Check Expo Go app warnings

---

## Build Process

### Web Production Build

```bash
cd frontend-web
npm run build
```

Output in `dist/` directory - optimized for production.

### Mobile Production Build

Android:

```bash
cd frontend-mobile
npm run build:android
```

iOS:

```bash
cd frontend-mobile
npm run build:ios
```

---

## Database

### Create Database

Backend auto-creates SQLite database on first run.

### Reset Database

```bash
# Delete database file to reset
rm backend/scrollearn.db

# Restart server - new DB created automatically
```

### Database Migrations

If using Alembic (not current setup, but for future):

```bash
cd backend
alembic upgrade head
```

---

## Hot Module Replacement (HMR)

### Web Frontend

- Automatic on file save
- State preserved when possible
- View changes instantly

### Mobile

- Metro bundler automatically recompiles
- May need to manually reload app (R + R)
- Full reload: file watcher watches for large changes

---

## Performance Optimization

### Web Frontend

- Vite handles code splitting automatically
- Use lazy loading for routes:

```javascript
const CardScroller = lazy(() => import("./components/CardScroller"));
```

### Backend

- Database queries optimized with indexes
- Consider caching for frequently accessed data
- Profile with: `pip install memory-profiler`

### Mobile

- Use React.memo for component optimization
- Lazy load screens
- Profile with React Native DevTools

---

## Version Management

- Backend: Python 3.9+
- Frontend: Node.js 18+
- React: 19.2.0
- React Native: 0.73.0

Check versions:

```bash
python --version
node --version
npm --version
```

---

## Useful Commands Summary

```bash
# Install all dependencies
npm run install:all

# Start all services
npm run start:all

# Build all services
npm run build:all

# Lint all services
npm run lint:all

# Format all code
npm run format:all

# Clean build artifacts
npm run clean
```

---

## Next Steps

- Read [API.md](./API.md) for API endpoints
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production
- Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
