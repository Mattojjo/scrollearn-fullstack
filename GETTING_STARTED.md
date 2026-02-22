# 🚀 Getting Started with ScrolLearn Fullstack

Welcome! You now have a complete fullstack application. This document will help you get up and running in minutes.

## What You Just Got

A production-ready card learning platform with:

- **Backend API** (FastAPI + SQLite/PostgreSQL)
- **Web Frontend** (React + Vite + Tailwind CSS)
- **Mobile App** (React Native for iOS & Android)
- **Complete Documentation** (Setup, deployment, contributing guides)

## 🎯 Start Here (5-10 Minutes)

### Option 1: Quick Start Script

```bash
cd /Users/leinad/dev/scrollearn-fullstack

# Make script executable
chmod +x start-services.sh

# Run all services
./start-services.sh
```

### Option 2: Manual Start (Recommended First Time)

**Terminal 1 - Backend (Port 8000)**

````bash
cd /Users/leinad/dev/scrollearn-fullstack/backend

# Create virtual environment with Python 3.12 (recommended)
# Use: python3.12 -m venv venv
# Or:  python3.11 -m venv venv
python3.12 -m venv venv

# Activate it
source venv/bin/activate

# Verify Python version (should be 3.12.x or 3.11.x)
python --version

Wait for: `INFO:     Uvicorn running on http://0.0.0.0:8000`

**Terminal 2 - Web Frontend (Port 5173)**

```bash
cd /Users/leinad/dev/scrollearn-fullstack/frontend-web

# Install dependencies
npm install

# Start development server
npm run dev
````

Wait for: `➜  Local:   http://localhost:5173/`

**Terminal 3 - Mobile (Optional)**

```bash
cd /Users/leinad/dev/scrollearn-fullstack/frontend-mobile

# Install dependencies
npm install

# Start mobile development
npm start

# Then press 'i' for iOS or 'a' for Android
```

## ✅ Verify It Works

1. **Backend API**: Open http://localhost:8000/docs
   - You should see the Swagger UI with all endpoints
   - Try the "GET /items/" endpoint

2. **Web App**: Open http://localhost:5173
   - You should see the ScrolLearn interface
   - Click "+" to add a test card
   - Verify it creates a card with title and content

3. **Mobile**: Check iOS simulator or Android emulator
   - Should show card management interface
   - Can create and view cards

## 📚 Next Steps

### 1. Explore the Code

**Backend** - `backend/app/`

- `main.py` - FastAPI application
- `models.py` - Database models
- `schemas.py` - Data validation
- `routes/items.py` - API endpoints

**Web Frontend** - `frontend-web/src/`

- `App.jsx` - Main component
- `components/CardScroller.jsx` - Card display
- `components/AddCardModal.jsx` - Add card dialog

**Mobile** - `frontend-mobile/src/`

- `App.tsx` - Navigation setup
- `screens/CardsScreen.tsx` - Card list
- `utils/api.ts` - API client

### 2. Read Documentation

- **[README.md](./README.md)** - Complete project overview
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Commands & tips
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute

### 3. Try the API

**Using curl:**

```bash
# Get all cards
curl http://localhost:8000/items/

# Create a card
curl -X POST http://localhost:8000/items/ \
  -H "Content-Type: application/json" \
  -d '{"name":"My Card","description":"Learning content"}'

# Delete a card
curl -X DELETE http://localhost:8000/items/1
```

**Using the Interactive Docs:**

1. Visit http://localhost:8000/docs
2. Click "Try it out" on any endpoint
3. Enter test data and execute

## 🔧 Common Commands

### Backend

```bash
# Run with debug
uvicorn app.main:app --reload --log-level debug

# Run on different port
uvicorn app.main:app --port 8001 --reload

# Check database
sqlite3 scrollearn.db ".tables"
```

### Web Frontend

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Mobile

```bash
# Run on iOS device
npm run ios -- --device=iPhone

# Run on Android device
npm run android

# Clear cache
npm start -- --reset-cache

# Build for iOS
npm run build:ios

# Build for Android
npm run build:android
```

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill the process
kill -9 <PID>

# Try again
uvicorn app.main:app --reload
```

### Frontend won't connect to backend

```bash
# Verify backend is running
curl http://localhost:8000/health

# Check API URL in App.jsx
# Should be: http://localhost:8000
```

### Mobile can't connect (Android Emulator)

- Change `localhost` to `10.0.2.2` in `frontend-mobile/src/utils/api.ts`
- Save and rebuild

### npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

## 📱 Test Across Platforms

Create a card in one platform and verify it appears in all:

1. **Create via Web Frontend**
   - Go to http://localhost:5173
   - Click "+" button
   - Enter title and content
   - Click "Add Card"

2. **View via Mobile App**
   - Open mobile simulator
   - Go to "Cards" tab
   - Should see the card you just created

3. **Create via Mobile**
   - Click "Add" tab in mobile app
   - Fill in title and content
   - Tap "Add Card"

4. **Verify via Web**
   - Refresh or navigate back to Cards
   - Should see the card created on mobile

5. **Check via API**
   - Visit http://localhost:8000/docs
   - Try "GET /items/"
   - Should see all cards from all platforms

## 📊 Project Structure at a Glance

```
scrollearn-fullstack/
├── backend/              ← FastAPI Backend (Python)
├── frontend-web/         ← React Web App
├── frontend-mobile/      ← React Native Mobile
├── README.md             ← Full overview
├── SETUP.md              ← Setup guide
├── QUICK_REFERENCE.md    ← Command cheatsheet
├── DEPLOYMENT.md         ← Deployment guide
└── CONTRIBUTING.md       ← Contributing guide
```

## 🚀 Deployment Preview

Ready to go live? See [DEPLOYMENT.md](./DEPLOYMENT.md) for:

- Heroku deployment
- Docker containerization
- AWS, DigitalOcean, Railway options
- Vercel for frontend
- App Store & Play Store publishing

## 🔐 Security Notes

For production, add:

- Authentication (JWT/OAuth)
- Input sanitization
- Rate limiting
- HTTPS everywhere
- Secure database backups

Details in [DEPLOYMENT.md](./DEPLOYMENT.md) Security Checklist

## 📞 Need Help?

1. **Setup Issues?** → See [SETUP.md](./SETUP.md)
2. **Command Help?** → See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
3. **API Questions?** → Visit http://localhost:8000/docs
4. **Code Questions?** → Check individual README.md files
5. **Deployment?** → See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 💡 Tips for Development

1. **Keep Terminal Windows Open** - One for each service
2. **Watch for Auto-reload** - Changes reload automatically
3. **Check Console Logs** - Errors appear in terminal
4. **Use Browser DevTools** - F12 for network/console debugging
5. **Read the READMEs** - Each folder has detailed docs

## 🎯 What to Build Next

After you're familiar with the codebase:

**Easy** (1-2 days)

- [ ] Add card editing functionality
- [ ] Add search/filter for cards
- [ ] Add card categories

**Medium** (1 week)

- [ ] User authentication
- [ ] User profiles
- [ ] Sharing cards with others

**Advanced** (2+ weeks)

- [ ] Real-time collaboration
- [ ] Advanced analytics
- [ ] Machine learning recommendations

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)

## 🎉 You're All Set!

You now have:

- ✅ A working fullstack application
- ✅ Complete source code
- ✅ Full documentation
- ✅ Deployment guides
- ✅ Contributing guidelines

**Start with the terminals and get the services running. Then explore the code and API documentation.**

Happy coding! 🚀

---

**Next Step**: Open 3 terminals and follow the "Option 2: Manual Start" instructions above.

**Questions?** Check [SETUP.md](./SETUP.md) or the README in each folder.
