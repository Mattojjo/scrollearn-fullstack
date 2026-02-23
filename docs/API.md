# API Documentation

Complete API reference for ScrolLearn backend.

## Base URL

`http://localhost:8000`

## Authentication

Currently no authentication required. Add JWT/OAuth for production.

## Response Format

All responses are JSON:

```json
{
  "status": "success|error",
  "data": {},
  "message": "Human readable message"
}
```

## Endpoints

### Items (Cards)

#### Get All Items

```http
GET /items/
```

Response:

```json
[
  {
    "id": 1,
    "name": "Learn React",
    "description": "Master React hooks and state management",
    "date": "2026-02-22T10:30:00"
  }
]
```

#### Create Item

```http
POST /items/
Content-Type: application/json

{
  "name": "Study Python",
  "description": "Learn Python fundamentals"
}
```

Response (201 Created):

```json
{
  "id": 2,
  "name": "Study Python",
  "description": "Learn Python fundamentals",
  "date": "2026-02-22T10:35:00"
}
```

#### Get Single Item

```http
GET /items/{id}
```

Response:

```json
{
  "id": 1,
  "name": "Learn React",
  "description": "Master React hooks",
  "date": "2026-02-22T10:30:00"
}
```

#### Update Item

```http
PUT /items/{id}
Content-Type: application/json

{
  "name": "Advanced React",
  "description": "Learn React patterns and optimization"
}
```

Response:

```json
{
  "id": 1,
  "name": "Advanced React",
  "description": "Learn React patterns and optimization",
  "date": "2026-02-22T10:30:00"
}
```

#### Delete Item

```http
DELETE /items/{id}
```

Response (204 No Content):

#### Delete All Items

```http
DELETE /items/
```

Response (204 No Content):

Note: Development only - remove in production.

---

### System Endpoints

#### Health Check

```http
GET /health
```

Response (200 OK):

```json
{
  "status": "healthy"
}
```

#### Root Endpoint

```http
GET /
```

Response:

```json
{
  "message": "ScrolLearn API",
  "version": "1.0.0"
}
```

---

## Status Codes

| Code | Meaning                                |
| ---- | -------------------------------------- |
| 200  | OK - Request successful                |
| 201  | Created - Resource created             |
| 204  | No Content - Success, no response body |
| 400  | Bad Request - Invalid input            |
| 404  | Not Found - Resource doesn't exist     |
| 500  | Server Error - Unexpected error        |

---

## Error Responses

### Invalid Input

```json
{
  "detail": "Field 'name' is required"
}
```

### Not Found

```json
{
  "detail": "Item not found"
}
```

### Server Error

```json
{
  "detail": "Internal server error"
}
```

---

## Interactive API Testing

### Swagger UI

Visit `http://localhost:8000/docs` for interactive Swagger interface.

Features:

- Try out endpoints directly
- See request/response examples
- View parameter descriptions

### ReDoc

Visit `http://localhost:8000/redoc` for browsable API documentation.

---

## cURL Examples

### Get All Items

```bash
curl http://localhost:8000/items/
```

### Create Item

```bash
curl -X POST http://localhost:8000/items/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Learn TypeScript",
    "description": "Master TypeScript types"
  }'
```

### Get Single Item

```bash
curl http://localhost:8000/items/1
```

### Update Item

```bash
curl -X PUT http://localhost:8000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced TypeScript",
    "description": "Type advanced patterns"
  }'
```

### Delete Item

```bash
curl -X DELETE http://localhost:8000/items/1
```

---

## JavaScript/Fetch Examples

### Get All Items

```javascript
fetch("http://localhost:8000/items/")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

### Create Item

```javascript
fetch("http://localhost:8000/items/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Learn Docker",
    description: "Master containerization",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

## Rate Limiting

Not currently implemented. Consider adding for production:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1645532400
```

---

## CORS

Currently enabled for all origins. Configure in `app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Pagination

Not currently implemented. For future scaling, add:

```http
GET /items/?skip=0&limit=10
```

---

## Database Schema

### Items Table

| Column      | Type     | Description          |
| ----------- | -------- | -------------------- |
| id          | integer  | Primary key          |
| name        | string   | Card title (max 255) |
| description | string   | Card content         |
| date        | datetime | Creation timestamp   |

---

## Best Practices

1. Always include Content-Type header for POST/PUT requests
2. Handle 404 errors when item doesn't exist
3. Validate input before sending to API
4. Use pagination when fetching large datasets (future)
5. Implement caching for frequently accessed data
6. Monitor API response times

---

## Webhook Events

Not currently implemented. Future additions:

- item.created
- item.updated
- item.deleted

---

## API Versioning

Current version: 1.0.0

Future versions might include `/api/v2/` endpoints alongside v1.

---

## Next Steps

- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Review [SETUP.md](./SETUP.md) for installation
