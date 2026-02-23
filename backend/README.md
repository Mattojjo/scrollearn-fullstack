# ScrolLearn Backend API

⚠️ **Work in Progress / Dusty Zone** - Experimental FastAPI backend for the ScrolLearn card-based learning platform.

**Tech Stack:** FastAPI • SQLAlchemy • Uvicorn • Pydantic

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.9+**
- **pip** (or poetry/pipenv)

### 1. Environment Setup

```bash
# Clone and navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate        # macOS/Linux
# OR
venv\Scripts\activate            # Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings (optional for development)
```

### 4. Run Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ Server running at: **http://localhost:8000**

---

## 📚 API Documentation

Once the server is running, access interactive documentation:

| Resource                     | URL                                |
| ---------------------------- | ---------------------------------- |
| **Swagger UI** (Interactive) | http://localhost:8000/docs         |
| **ReDoc** (Browse)           | http://localhost:8000/redoc        |
| **OpenAPI Schema**           | http://localhost:8000/openapi.json |

---

## 📋 API Endpoints

### Cards/Items

| Method   | Endpoint      | Description     |
| -------- | ------------- | --------------- |
| `GET`    | `/items/`     | Get all cards   |
| `POST`   | `/items/`     | Create new card |
| `GET`    | `/items/{id}` | Get card by ID  |
| `PUT`    | `/items/{id}` | Update card     |
| `DELETE` | `/items/{id}` | Delete card     |

**Example - Create Card:**

```bash
curl -X POST http://localhost:8000/items/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Learn React","description":"Master React hooks"}'
```

### System Health

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| `GET`  | `/`       | Root endpoint |
| `GET`  | `/health` | Health check  |

---

## 🗄️ Database Configuration

### Development (SQLite - Default)

```
scrollearn.db          # Auto-created in project root
```

### Testing (PostgreSQL)

```bash
# Set in .env for testing with PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/scrollearn
```

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app & routes
│   ├── database.py             # Database configuration
│   ├── models.py               # SQLAlchemy ORM models
│   ├── schemas.py              # Pydantic validation schemas
│   └── routes/
│       └── items.py            # Item/card endpoints
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
├── venv/                       # Virtual environment (gitignored)
└── README.md                   # This file
```

---

## 🔧 Development Workflow

### Add a New Endpoint

1. **Define Pydantic schema** in `schemas.py`
2. **Create SQLAlchemy model** in `models.py`
3. **Add route** in `routes/items.py` or new routes file
4. **Test with** http://localhost:8000/docs

### Environment Variables

Create `.env` file in `backend/` directory:

```env
DATABASE_URL=sqlite:///./scrollearn.db
ENVIRONMENT=development
DEBUG=True
```

### Run with Custom Settings

```bash
# Use different port
uvicorn app.main:app --reload --port 8001

# Testing mode (no reload)
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 📦 Dependencies

| Package              | Purpose         |
| -------------------- | --------------- |
| **fastapi**          | Web framework   |
| **uvicorn**          | ASGI server     |
| **sqlalchemy**       | ORM & database  |
| **pydantic**         | Data validation |
| **python-multipart** | Form handling   |

See `requirements.txt` for exact versions.

---

## 🚨 Troubleshooting

| Issue            | Solution                                    |
| ---------------- | ------------------------------------------- |
| Port 8000 in use | Use `--port 8001` flag                      |
| Database locked  | Delete `scrollearn.db` and restart          |
| Import errors    | Run `pip install -r requirements.txt` again |
| CORS errors      | Check `main.py` for `CORSMiddleware` config |

---

## 📝 Notes

- ⚙️ Database tables auto-created on startup
- 🔓 CORS enabled for all origins (experimental - not for production)
- 📖 Interactive API docs at `/docs` for testing
- 🔐 Authentication/authorization not yet implemented
- 📊 Early-stage project - optimizations needed

---

## 📞 Support

For issues or questions:

1. Check `/docs` for API documentation
2. Review error messages in terminal
3. Verify database connection in `.env`
