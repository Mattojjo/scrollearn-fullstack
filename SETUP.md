# SETUP GUIDE

This guide walks you through setting up and running the entire ScrolLearn fullstack application.

## Prerequisites

- Node.js 18+ and npm or pnpm
- **Python 3.12** (Recommended) or Python 3.11 (for backend)
  - ⚠️ Python 3.14+ may have compatibility issues with pydantic-core
  - Check your version: `python3 --version`
- macOS (for iOS development)
- Android Studio (for Android development)
- Git

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd scrollearn-fullstack
```

## Step 2: Backend Setup

### 2.1 Create Python Virtual Environment

```bash
cd backend

# For Python 3.12 (Recommended)
python3.12 -m venv venv

# OR for Python 3.11
python3.11 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows
```

**Verify Python version in virtual environment:**

```bash
python --version  # Should show 3.12.x or 3.11.x
```

### 2.2 Install Dependencies

```bash
pip install -r requirements.txt
```

### 2.3 Configure Environment

```bash
cp .env.example .env
# Update .env if needed
```

### 2.4 Run Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see:

```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

Test the API: Visit `http://localhost:8000/docs`

## Step 3: Web Frontend Setup

### 3.1 Install Dependencies

```bash
cd ../frontend-web
npm install
# or
pnpm install
```

### 3.2 Start Development Server

```bash
npm run dev
```

You should see:

```
VITE v7.3.1  ready in XX ms

➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173` in your browser.

## Step 4: Mobile App Setup

### 4.1 Install Dependencies

```bash
cd ../frontend-mobile
npm install
```

### 4.2 Install iOS/Android Dependencies

For iOS:

```bash
cd ios
pod install
cd ..
```

For Android, use Android Studio or:

```bash
# Just use Android tooling
```

### 4.3 Run the App

#### iOS Development

```bash
npm run ios
```

#### Android Development

```bash
npm run android
```

#### Or Start Metro Bundler

```bash
npm start
# Select i for iOS or a for Android
```

## Verification Checklist

- [ ] Backend running on `http://localhost:8000`
- [ ] Backend API docs accessible at `http://localhost:8000/docs`
- [ ] Web frontend running on `http://localhost:5173`
- [ ] Can load cards in web frontend
- [ ] Can create a test card via web frontend
- [ ] Mobile app connects to backend
- [ ] Mobile app displays cards
- [ ] Can create a test card via mobile app

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**

```bash
lsof -i :8000  # Find process
kill -9 <PID>  # Kill process
```

**Virtual environment not activating:**

```bash
# Try Python's venv directly
python -m venv venv
source venv/bin/activate
```

**Database errors:**

```bash
# Delete SQLite database and restart
rm scrollearn.db
uvicorn app.main:app --reload
```

**`pydantic-core` wheel build error:**

If you see: `TypeError: ForwardRef._evaluate() missing 1 required keyword-only argument`

This is a Python version incompatibility. **Use Python 3.12:**

```bash
# Delete the old venv
rm -rf venv

# Create new venv with Python 3.12
python3.12 -m venv venv

# Activate and reinstall
source venv/bin/activate
pip install -r requirements.txt
```

**Issue:** Python 3.14+ doesn't have pre-built wheels for pydantic-core. Use Python 3.11 or 3.12.

### Web Frontend Issues

**npm install fails:**

```bash
# Clear npm cache and retry
npm cache clean --force
npm install
```

**Port 5173 in use:**

```bash
# Change port in vite.config.js or kill process
lsof -i :5173
kill -9 <PID>
```

### Mobile Issues

**Android emulator can't reach backend:**

- Use `10.0.2.2` instead of `localhost`
- Edit `frontend-mobile/src/utils/api.ts`

**iOS build issues:**

```bash
cd frontend-mobile/ios
pod install --repo-update
cd ..
npm run ios
```

**Metro bundler issues:**

```bash
npm start -- --reset-cache
```

## Development Workflow

### Terminal Setup

Open 3-4 terminals:

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2 - Web Frontend
cd frontend-web
npm run dev

# Terminal 3 - Mobile (optional)
cd frontend-mobile
npm start

# Terminal 4 - Optional for git/commands
cd scrollearn-fullstack
```

### Making Changes

Any changes to your code will automatically reload:

- Backend: Uvicorn auto-reload
- Web: Vite hot reload
- Mobile: Metro bundler hot reload

## Environment Variables

### Backend

Create `backend/.env`:

```env
DATABASE_URL=sqlite:///./scrollearn.db
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

### Frontend Web

Edit `frontend-web/src/App.jsx`:

```javascript
const API_BASE_URL = `http://${window.location.hostname}:8000`;
```

### Mobile

Edit `frontend-mobile/src/utils/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:8000";
// For Android emulator:
// const API_BASE_URL = 'http://10.0.2.2:8000';
```

## Next Steps

1. Explore the API documentation at `http://localhost:8000/docs`
2. Test creating and deleting cards across all platforms
3. Review the individual README.md files in each folder
4. Implement additional features
5. Deploy to production

## Useful Commands

### Backend

```bash
# Run with specific settings
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Check database
sqlite3 scrollearn.db

# Reset database
rm scrollearn.db
```

### Web Frontend

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Mobile

```bash
# Start bundler
npm start

# Run on iOS device
npm run ios -- --device=iPhone

# Run on Android device
npm run android

# Clear cache
npm start -- --reset-cache
```

## Documentation

- [Backend README](./backend/README.md)
- [Web Frontend README](./frontend-web/README.md)
- [Mobile Frontend README](./frontend-mobile/README.md)
- [Main README](./README.md)

## Support

For issues:

1. Check the respective README.md files
2. Review error messages in terminal
3. Check browser/device console for errors
4. Verify all services are running
5. Check that ports are correct and available

Happy coding! 🚀
