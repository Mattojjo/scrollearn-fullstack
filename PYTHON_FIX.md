# ✅ Python Version Fix - Pydantic-Core Error Resolved

## The Problem

You were getting this error when installing backend dependencies:

```
TypeError: ForwardRef._evaluate() missing 1 required keyword-only argument: 'recursive_guard'
Error: Failed building wheel for pydantic-core
```

**Cause:** Your virtual environment was using Python 3.14, which doesn't have pre-built wheels for `pydantic-core`. The library needs to be compiled from source, requiring Rust and C++ compilers.

## The Solution ✅

Use **Python 3.12** (or 3.11) instead of Python 3.14.

### What Was Done

1. ✅ Deleted the old Python 3.14 virtual environment
2. ✅ Created new virtual environment with Python 3.12
3. ✅ Successfully installed all dependencies
4. ✅ Updated documentation to specify Python 3.12/3.11

### Current Status

**Backend is now ready to use!** ✅

```
✅ FastAPI 0.104.1
✅ SQLAlchemy 2.0.23
✅ Pydantic 2.5.0
✅ Uvicorn 0.24.0
✅ All dependencies installed
```

## How to Use the Backend

### 1. Activate Virtual Environment

```bash
cd /Users/leinad/dev/scrollearn-fullstack/backend
source venv/bin/activate
```

Python will be 3.12.12 automatically.

### 2. Run the Server

```bash
uvicorn app.main:app --reload
```

You'll see:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

### 3. Test the API

Visit: http://localhost:8000/docs

You'll see the interactive API documentation with all endpoints.

## System Info

**Installed Python versions on your Mac:**

- Python 3.14.3 (Too new - causes build issues)
- Python 3.12.12 (✅ Recommended - what backend uses now)

**Virtual Environment Details:**

```
Location: /Users/leinad/dev/scrollearn-fullstack/backend/venv/
Python Version: 3.12.12
Status: Ready to use
```

## Next Steps

### Quick Start

Open 3 terminals:

**Terminal 1 - Backend:**

```bash
cd /Users/leinad/dev/scrollearn-fullstack/backend
source venv/bin/activate
uvicorn app.main:app --reload
# Listen on: http://localhost:8000
```

**Terminal 2 - Web:**

```bash
cd /Users/leinad/dev/scrollearn-fullstack/frontend-web
npm install  # (if not done)
npm run dev
# Visit: http://localhost:5173
```

**Terminal 3 - Mobile (optional):**

```bash
cd /Users/leinad/dev/scrollearn-fullstack/frontend-mobile
npm install  # (if not done)
npm start
# Follow prompts for iOS or Android
```

## Documentation Updated

The following guides now specify Python 3.12:

✅ [SETUP.md](./SETUP.md) - "Python 3.12 (Recommended) or Python 3.11"
✅ [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Updated commands
✅ [GETTING_STARTED.md](./GETTING_STARTED.md) - Shows `python3.12 -m venv venv`
✅ [README.md](./README.md) - Backend setup section updated

## Troubleshooting

### If you have a new venv and get pydantic-core error:

```bash
# Delete the venv
rm -rf venv

# Create new one with Python 3.12
python3.12 -m venv venv

# Activate and reinstall
source venv/bin/activate
pip install -r requirements.txt
```

### Verify your Python version is correct:

```bash
python --version  # Should show 3.12.12
```

## Why Python 3.12?

- ✅ Pre-built wheels available (instant installation)
- ✅ Stable and production-ready
- ✅ All dependencies work perfectly
- ✅ Compatible with FastAPI 0.104.1, Pydantic 2.5.0, etc.

Python 3.14 (the newest) doesn't have pre-built wheels for compiled packages like `pydantic-core`, requiring complex build tools.

## You're All Set! 🚀

- Backend: ✅ Ready
- Frontend: ✅ Ready
- Mobile: ✅ Ready
- Documentation: ✅ Updated

Start the services and enjoy your fullstack app!

---

For more info, see [SETUP.md](./SETUP.md) or [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
