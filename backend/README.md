# ScrolLearn Backend

FastAPI backend for the ScrolLearn platform - a card-based learning application.

## Setup

### 1. Create virtual environment

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment

```bash
cp .env.example .env
# Update .env with your settings if needed
```

### 4. Run the server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

- **Interactive Docs**: http://localhost:8000/docs (Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc (ReDoc)

## API Endpoints

### Items (Cards)

- `GET /items/` - Get all items
- `POST /items/` - Create new item
- `GET /items/{item_id}` - Get specific item
- `PUT /items/{item_id}` - Update item
- `DELETE /items/{item_id}` - Delete item
- `DELETE /items/` - Delete all items (development)

### System

- `GET /` - Root endpoint
- `GET /health` - Health check

## Database

### SQLite (Development)

- Default: `scrollearn.db` in project root
- Auto-created on first run

### PostgreSQL (Production)

```bash
DATABASE_URL=postgresql://user:password@localhost/scrollearn
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application
│   ├── database.py      # Database configuration
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   └── routes/
│       └── items.py     # Item endpoints
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── README.md           # This file
```

## Development Tips

- The API automatically creates database tables on startup
- CORS is enabled for all origins (change in production)
- Use `/docs` for interactive API testing
- Structured logging can be added to app/main.py
