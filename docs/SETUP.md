# Setup Guide

Complete installation and configuration guide for ScrolLearn Fullstack.

## Prerequisites

- Python 3.9+ (for backend)
- Node.js 18+ (for frontend)
- npm or pnpm (package manager)
- Git

## Backend Setup

### 1. Python Virtual Environment

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate          # macOS/Linux
# OR
venv\Scripts\activate              # Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

```bash
cp .env.example .env
# Edit .env for your environment (optional for development)
```

### 4. Run Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend API available at: `http://localhost:8000`
Interactive API docs at: `http://localhost:8000/docs`

---

## Frontend Web Setup

### 1. Install Dependencies

```bash
cd frontend-web
npm install
```

Alternatively with pnpm:

```bash
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
```

App available at: `http://localhost:5173`

### 3. Build for Testing

```bash
npm run build
```

Output: `dist/` directory (experimental build)

---

## Frontend Mobile Setup

### 1. Install Dependencies

```bash
cd frontend-mobile
npm install
```

### 2. Start Development

```bash
npm start
```

Then for specific platform:

```bash
npm run ios      # iOS simulator
npm run android  # Android emulator
```

---

## Running All Services

Open three separate terminals:

**Terminal 1 - Backend:**

```bash
cd backend
source venv/bin/activate
npm run backend
```

**Terminal 2 - Web Frontend:**

```bash
cd frontend-web
npm run dev
```

**Terminal 3 - Mobile (optional):**

```bash
cd frontend-mobile
npm start
```

---

## Environment Variables

### Backend (.env)

Located in `backend/.env`:

```env
DATABASE_URL=sqlite:///./scrollearn.db
ENVIRONMENT=development
DEBUG=True
```

For testing with PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/scrollearn
ENVIRONMENT=testing
DEBUG=False
```

### Web Frontend (.env.local)

Located in `frontend-web/.env.local`:

```env
VITE_API_URL=http://localhost:8000
```

### Mobile Frontend

Edit `frontend-mobile/src/utils/api.ts`:

```typescript
const API_BASE_URL = "http://localhost:8000";
```

Note: On Android emulator, use `10.0.2.2` instead of `localhost`.

---

## Troubleshooting

| Issue               | Solution                                            |
| ------------------- | --------------------------------------------------- |
| Port 8000 in use    | Run server on different port: `--port 8001`         |
| Python not found    | Ensure Python is in PATH, or use `python3` directly |
| Module not found    | Run `pip install -r requirements.txt` again         |
| npm modules missing | Run `npm install` in the service directory          |
| Database error      | Delete `.db` file and restart backend               |

---

## Verification

### Check Backend

```bash
curl http://localhost:8000/health
```

Should return success response.

### Check Web Frontend

Open browser to `http://localhost:5173`

### Check API Documentation

Visit `http://localhost:8000/docs` in browser

---

## Next Steps

After setup:

1. Read [DEVELOPMENT.md](./DEVELOPMENT.md) for development workflow
2. Check [API.md](./API.md) for API endpoints
3. Review service-specific README files
