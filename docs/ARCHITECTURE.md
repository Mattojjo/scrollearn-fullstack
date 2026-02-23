# Architecture Guide

Technical architecture and design decisions for ScrolLearn.

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                     User Devices                         │
│        (Browser | iOS App | Android App)                │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/HTTP
┌────────────────────▼────────────────────────────────────┐
│              Frontend Applications                       │
│  ┌──────────────┬──────────────┬──────────────┐         │
│  │   Web App    │  iOS App     │ Android App  │         │
│  │   (React)    │ (React Native)               │         │
│  └──────────────┴──────────────┴──────────────┘         │
│                                                          │
│  API Client Libraries                                   │
│  (Axios, Fetch, native HTTP)                            │
└────────────────────┬────────────────────────────────────┘
                     │ REST API (JSON)
┌────────────────────▼────────────────────────────────────┐
│              Backend API Server                         │
│  ┌─────────────────────────────────────────────┐       │
│  │         FastAPI Application                  │       │
│  │  ┌─────────────────────────────────────┐   │       │
│  │  │    Routes / Endpoints                │   │       │
│  │  │  (GET, POST, PUT, DELETE /items)    │   │       │
│  │  └─────────────────────────────────────┘   │       │
│  │            ▼                                 │       │
│  │  ┌─────────────────────────────────────┐   │       │
│  │  │   Business Logic / Services         │   │       │
│  │  │  (CRUD operations)                  │   │       │
│  │  └─────────────────────────────────────┘   │       │
│  │            ▼                                 │       │
│  │  ┌─────────────────────────────────────┐   │       │
│  │  │    Database Layer (SQLAlchemy ORM)  │   │       │
│  │  │  (Models, Sessions)                 │   │       │
│  │  └─────────────────────────────────────┘   │       │
│  └─────────────────────────────────────────────┘       │
└────────────────────┬────────────────────────────────────┘
                     │ SQL
┌────────────────────▼────────────────────────────────────┐
│              Database                                   │
│        (SQLite | PostgreSQL)                           │
│  ┌─────────────────────────────────────┐              │
│  │     Items Table                      │              │
│  │  id | name | description | date     │              │
│  └─────────────────────────────────────┘              │
└──────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Backend

- **Framework:** FastAPI (modern, fast, async-capable)
- **ORM:** SQLAlchemy (database abstraction)
- **Validation:** Pydantic (data validation)
- **Server:** Uvicorn (ASGI server)
- **Database:** SQLite (dev), PostgreSQL (prod)

Rationale:

- FastAPI is lightweight and performant
- SQLAlchemy provides database flexibility
- Can switch from SQLite to PostgreSQL without code changes

### Frontend Web

- **Framework:** React 19 (component-based UI)
- **Build Tool:** Vite (fast development, optimized builds)
- **Styling:** CSS Variables (maintainable, no framework dependency)
- **HTTP Client:** Axios (promise-based requests)
- **State Management:** React Hooks (built-in, sufficient)

Rationale:

- React handles complex UI state easily
- Vite provides instant HMR during development
- CSS Variables offer theming without Tailwind complexity
- Hooks eliminate class component boilerplate

### Mobile

- **Framework:** React Native (native iOS/Android)
- **Package Manager:** npm (consistent with web)
- **Development:** Expo (simplified setup)
- **HTTP Client:** Native fetch API (built-in)
- **State Management:** React Hooks (consistent with web)

Rationale:

- Code sharing with web (same JavaScript/TypeScript)
- Native performance for mobile
- Expo simplifies iOS/Android setup

---

## Data Flow

### Create Card Flow

```
User Input → React Component → Event Handler → API Call
    ↓
axios.post('/items/', {name, description})
    ↓
Backend: POST /items/ → Validation (Pydantic) → Database Insert
    ↓
Response: New Item Object → Frontend Updates State
    ↓
UI Re-renders with New Card
```

### Read Card Flow

```
Component Mounts → useEffect Hook → API Call
    ↓
axios.get('/items/')
    ↓
Backend: GET /items/ → Database Query → Iterate Results
    ↓
Response: [Items] → Frontend setState
    ↓
UI Shows All Cards
```

### Delete Card Flow

```
User Clicks Delete → Confirmation Modal → Confirm Click
    ↓
axios.delete('/items/{id}')
    ↓
Backend: DELETE /items/{id} → Find Item → Delete from DB
    ↓
Response: 204 No Content → Frontend Updates State
    ↓
UI Removes Card from List
```

---

## Component Architecture

### Frontend Web

```
App (Main Component)
├── useCards Hook
│   ├── loadCards()
│   ├── addCard()
│   ├── removeCard()
│   └── clearError()
│
├── CardScroller Component
│   ├── Touch Event Handlers
│   ├── Keyboard Navigation
│   ├── Card Display
│   └── Navigation Controls
│
└── AddCardModal Component
    ├── Form Inputs
    ├── Validation
    └── Submit Handler
```

### Backend

```
app/
├── main.py (Application setup, routes)
├── database.py (Database session, connection)
├── models.py (SQLAlchemy Item model)
├── schemas.py (Pydantic validation schemas)
└── routes/
    └── items.py (CRUD endpoints)
```

---

## Database Schema

### Items Table

```sql
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Relationships:

- One item = one row
- No foreign keys (single entity relation)
- Can be extended with user_id for multi-user

Future schema (with users):

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255)
);

CREATE TABLE items (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL FOREIGN KEY,
    name VARCHAR(255),
    description TEXT
);
```

---

## API Design

### RESTful Principles

- Resources: `/items`
- Methods: GET (read), POST (create), PUT (update), DELETE (delete)
- Status codes: 200 (OK), 201 (Created), 204 (No Content), 404 (Not Found)
- Format: JSON

### Request/Response Pattern

Request:

```http
POST /items/
Content-Type: application/json

{
  "name": "Learn Rust",
  "description": "Master systems programming"
}
```

Response:

```json
{
  "id": 5,
  "name": "Learn Rust",
  "description": "Master systems programming",
  "date": "2026-02-22T15:30:00"
}
```

---

## State Management

### Frontend Web (React Hooks)

```javascript
// Custom hook manages all card state
const useCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCards = useCallback(async () => {
    // ...fetch and update state
  }, []);

  return { cards, loading, error, loadCards, ... };
};

// Component consumes hook
const App = () => {
  const { cards, loading, error } = useCards();
  // ...render
};
```

Benefits:

- Centralized state logic
- Reusable across components
- Easy to test
- Built-in React hooks

### Backend (Stateless)

- No session state (RESTful)
- Database is source of truth
- Each request is independent
- Scales horizontally

---

## Error Handling

### Backend

```python
@router.get("/items/{item_id}")
async def get_item(item_id: int):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )
    return item
```

### Frontend

```javascript
try {
  const response = await axios.get("/items/");
  setCards(response.data);
} catch (error) {
  setError(error.response?.data?.detail || "Unknown error");
}
```

---

## Performance Considerations

### Database

- Indexed primary key (automatic in SQLite)
- Direct table queries (no N+1 for single entity)
- Connection pooling (PostgreSQL)

### API

- Minimal payload sizes (only needed fields)
- No unnecessary nesting
- Response caching possible (future)

### Frontend

- Lazy component loading
- Memoization with React.memo
- CSS animations over JavaScript

### Mobile

- Metro bundler optimization
- Image lazy loading
- Efficient state updates

---

## Security Layers

```
User ─── Browser Security ─── HTTPS/SSL ─── API Gateway ─── Service
         (XSS, CSRF)                          (Rate limit)     (Validation)
                                                               │
                                                      Database (SQL injection)
```

Current implementation:

- Pydantic validation (prevents invalid data)
- SQLAlchemy ORM (prevents SQL injection)
- CORS enabled (currently all origins)

Future:

- JWT authentication
- HTTPS enforcement
- Rate limiting
- Input sanitization

---

## Scalability

### Vertical Scaling (Easier)

- Upgrade server resources (CPU, RAM)
- Increase database connection pool
- Enable caching (Redis)

### Horizontal Scaling (Complex)

- Load balancer (nginx, HAProxy)
- Multiple API instances
- Shared PostgreSQL database
- Optional: Message queue (Celery)

```
┌──────────┐
│ Load     │
│ Balancer │
└────┬─────┘
     │
  ┌──┴──┐
  │     │
┌─▼──┐ ┌──▼──┐
│API │ │API  │
│ 1  │ │ 2   │
└─┬──┘ └┬────┘
  │     │
  └──┬──┘
     │
  ┌──▼────────┐
  │PostgreSQL │
  │Database   │
  └───────────┘
```

---

## Testing Strategy

### Backend Testing

```python
# Unit tests
def test_create_item():
    item = create_item("Test", "Description")
    assert item.name == "Test"

# Integration tests
def test_api_create_endpoint():
    response = client.post("/items/", json={...})
    assert response.status_code == 201
```

### Frontend Testing

```javascript
// Component tests
test('renders card scroller', () => {
  render(<CardScroller cards={[...]} />);
  expect(screen.getByText('Card Title')).toBeInTheDocument();
});

// Integration tests
test('loads cards on mount', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });
});
```

---

## Deployment Architecture

Experimental deployment setup (work in progress):

```
┌────────────────────────────────────────┐
│        Cloudflare / CDN                │
│      (Static Assets Cached)            │
└────────────────────────────────────────┘
           │
    ┌──────┴──────┐
    │             │
┌───▼───┐   ┌────▼──────┐
│ Vercel│   │ Render API │
│ Web   │   │ (FastAPI)  │
│ App   │   └─────┬──────┘
├───────┤         │
│ React │   ┌─────▼────────────┐
│ Build │   │PostgreSQL Database
│ (Dist)    └──────────────────┘
└───────┤
        │
    (Git Push)
```

---

## Monitoring & Observability

### Metrics to Track

- API response time (p50, p95, p99)
- Error rate (5xx, 4xx responses)
- Database query time
- User session duration
- Feature usage

### Logging Levels

- DEBUG: Detailed troubleshooting info
- INFO: General informational messages
- WARNING: Something unexpected
- ERROR: Serious problem
- CRITICAL: System down

---

## Future Improvements

1. User authentication (JWT)
2. Multi-user support (authorization)
3. Spaced repetition algorithm
4. Real-time sync (WebSocket)
5. Offline support (Service Workers)
6. Progressive Web App (PWA)
7. Advanced search
8. Import/export functionality
9. Collaboration features
10. Analytics & insights

---

## References

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [REST API Best Practices](https://restfulapi.net/)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
