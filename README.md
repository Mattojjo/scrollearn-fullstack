# ScrolLearn Fullstack Application

A comprehensive card-based learning platform with web and mobile support. This project consolidates frontend, backend, and mobile applications into a single fullstack solution.

## Project Structure

```
scrollearn-fullstack/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app entry point
│   │   ├── database.py        # Database configuration
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── schemas.py         # Pydantic schemas
│   │   └── routes/
│   │       └── items.py       # API endpoints
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend-web/               # React + Vite web application
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── frontend-mobile/            # React Native mobile app
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── index.js
│   ├── app.json
│   ├── package.json
│   └── README.md
└── README.md                   # This file
```

## Tech Stack

### Backend

- **Framework**: FastAPI
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Server**: Uvicorn

### Frontend Web

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Package Manager**: npm/pnpm

### Frontend Mobile

- **Framework**: React Native
- **Navigation**: React Navigation
- **Package Manager**: npm/pnpm
- **Platforms**: iOS & Android

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Create virtual environment with Python 3.12 (or Python 3.11)
python3.12 -m venv venv

# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Verify Python version (should be 3.12.x or 3.11.x)
python --version

# Install dependencies
pip install -r requirements.txt

# Configure environment (optional)
cp .env.example .env

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend will be available at**: `http://localhost:8000`
**API Documentation**: `http://localhost:8000/docs`

### 2. Frontend Web Setup

```bash
cd frontend-web

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
```

**Frontend will be available at**: `http://localhost:5173`

### 3. Frontend Mobile Setup

```bash
cd frontend-mobile

# Install dependencies
npm install

# Run on iOS
npm run ios

# Or run on Android
npm run android

# Or start Metro bundler and follow prompts
npm start
```

## Running All Services

To run the complete stack, open three terminals:

### Terminal 1 - Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Web Frontend

```bash
cd frontend-web
npm run dev
```

### Terminal 3 - Mobile (optional)

```bash
cd frontend-mobile
npm start
```

## API Documentation

### Backend API

The backend provides a RESTful API with the following endpoints:

#### Items (Cards)

- `GET /items/` - Get all items with pagination
- `POST /items/` - Create a new item
- `GET /items/{item_id}` - Get a specific item
- `PUT /items/{item_id}` - Update an item
- `DELETE /items/{item_id}` - Delete an item
- `DELETE /items/` - Delete all items (dev only)

#### System

- `GET /` - Health check and API info
- `GET /health` - Health status

### Interactive Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Configuration

### Backend Configuration

Environment variables in `backend/.env`:

```env
DATABASE_URL=sqlite:///./scrollearn.db
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

For production with PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost/scrollearn
```

### Frontend Web Configuration

API URL in [frontend-web/src/App.jsx](frontend-web/src/App.jsx#L5):

```javascript
const API_BASE_URL = `http://${window.location.hostname}:8000`;
```

### Frontend Mobile Configuration

API URL in [frontend-mobile/src/utils/api.ts](frontend-mobile/src/utils/api.ts#L3):

```typescript
const API_BASE_URL = "http://localhost:8000";
```

For Android emulator, use `10.0.2.2` instead of `localhost`.

## Features

### Core Features

- ✅ Create, read, update, and delete cards
- ✅ Responsive design for all devices
- ✅ Card scrolling and browsing
- ✅ Beautiful UI with gradients and animations
- ✅ Real-time API integration
- ✅ Error handling and user feedback

### Web Features

- 🎨 Modern gradient UI
- ⌨️ Keyboard navigation (Arrow keys)
- 🖱️ Mouse and touch controls
- 📱 Mobile-responsive layout
- ✨ Smooth animations and transitions

### Mobile Features

- 🚀 Native iOS and Android apps
- 📲 Touch-optimized interface
- 🔄 Swipe gestures
- 🌙 Dark mode by default
- 📡 Offline-first architecture (ready to implement)

## Database Schema

### Items Table

```
id (Integer, Primary Key)
name (String)
description (String)
date (DateTime)
user_id (Integer)
```

## Development Workflow

### Making Changes

1. **Backend**: Edit files in `backend/app/` and changes auto-reload
2. **Frontend Web**: Edit files in `frontend-web/src/` and changes auto-refresh
3. **Mobile**: Edit files in `frontend-mobile/src/` and rebuild with Metro

### Adding New Features

#### Backend

1. Create models in `app/models.py`
2. Create schemas in `app/schemas.py`
3. Add routes in `app/routes/`
4. Include router in `app/main.py`

#### Frontend Web

1. Create components in `src/components/`
2. Update `src/App.jsx` as needed
3. Use Tailwind classes for styling

#### Mobile

1. Create screens in `src/screens/`
2. Create components in `src/components/`
3. Add API calls in `src/utils/api.ts`

## Build & Deployment

### Web Build

```bash
cd frontend-web
npm run build
```

Output: `dist/` directory

### Mobile Build

#### iOS

```bash
cd frontend-mobile/ios
xcodebuild -workspace ScrolLearnMobile.xcworkspace \
  -scheme ScrolLearnMobile \
  -configuration Release
```

#### Android

```bash
cd frontend-mobile/android
./gradlew assembleRelease
```

### Backend Deployment

Server image (Docker recommended):

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Troubleshooting

### Backend Won't Start

- Check if port 8000 is in use: `lsof -i :8000`
- Ensure Python virtual environment is activated
- Verify all dependencies are installed: `pip install -r requirements.txt`

### Frontend Won't Connect to Backend

- Verify backend is running: `curl http://localhost:8000/health`
- Check CORS headers in browser console
- Ensure API URL is correct in frontend config
- Check firewall settings

### Mobile App Connection Issues

- On Android emulator, replace `localhost` with `10.0.2.2`
- Check network connectivity on device
- Verify backend is accessible from device network
- Clear Metro bundler cache: `npm start -- --reset-cache`

## Environment Variables

### Backend `.env`

```env
DATABASE_URL=sqlite:///./scrollearn.db
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

## Docker Support (Optional)

To dockerize the backend:

```bash
cd backend
docker build -t scrollearn-backend .
docker run -p 8000:8000 scrollearn-backend
```

## Testing

### Backend Testing

Add pytest configuration and tests in `backend/tests/`

### Frontend Web Testing

Use Vitest or Jest: `npm run test`

### Mobile Testing

Use Jest or Detox for E2E testing

## Contributing

1. Create feature branches
2. Make changes following the structure
3. Test on all platforms (web, iOS, Android)
4. Keep documentation updated

## Performance Optimization

### Backend

- Enable caching headers
- Implement pagination (already in place)
- Use database indexes
- Consider Redis for caching

### Web Frontend

- Code splitting with Vite
- Image optimization
- Lazy loading routes
- Service workers for offline support

### Mobile

- Implement offline-first with AsyncStorage
- Code splitting and lazy loading
- Image caching
- Performance monitoring

## Security Considerations

For production:

1. **Backend**
   - Add authentication (JWT/OAuth)
   - Use environment variables for secrets
   - Sanitize user input
   - Rate limiting
   - HTTPS enforcement

2. **Frontend**
   - Content Security Policy headers
   - XSS protection
   - CSRF tokens if needed
   - Secure storage for sensitive data

3. **Mobile**
   - Keychain storage for tokens (iOS)
   - Keystore for secrets (Android)
   - Certificate pinning
   - App signing

## License

MIT

## Support

For issues or questions:

1. Check the README in each folder
2. Review the API documentation at `/docs`
3. Check browser console for errors
4. Verify all services are running

## Next Steps

1. ✅ Backend API running
2. ✅ Web frontend working
3. ✅ Mobile app configured
4. 🔄 Add authentication
5. 🔄 Implement pagination UI
6. 🔄 Add offline support
7. 🔄 Deploy to production
8. 🔄 Monitor and optimize

## Version

- **Project**: 1.0.0
- **Backend API**: 1.0.0
- **Frontend Web**: 1.0.0
- **Frontend Mobile**: 1.0.0
