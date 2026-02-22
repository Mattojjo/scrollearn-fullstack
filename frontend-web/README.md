# ScrolLearn Frontend (Web)

Modern React + Vite frontend for ScrolLearn - a card-based learning platform.

## Features

- ⚡ Vite for fast development and builds
- 🎨 Tailwind CSS for styling
- 💳 Card scrolling interface
- ➕ Add, view, and delete cards
- 📱 Responsive design (desktop and mobile)
- 🎯 Swipe gestures support

## Setup

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
cd frontend-web
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

Builds the app for production to the `dist/` directory.

### Lint

```bash
npm run lint
```

## Configuration

The API is configured to connect to `http://localhost:8000` by default.

To change the API URL, edit [src/App.jsx](src/App.jsx#L5):

```javascript
const API_BASE_URL = `http://${window.location.hostname}:8000`;
```

## Project Structure

```
frontend-web/
├── src/
│   ├── components/
│   │   ├── CardScroller.jsx    # Main card scrolling component
│   │   └── AddCardModal.jsx    # Modal for adding new cards
│   ├── assets/                 # Static assets
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Entry point
│   └── index.css              # Global styles
├── public/                     # Public assets
├── index.html                  # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## API Integration

The frontend communicates with the backend API:

### Endpoints Used

- `GET /items/` - Fetch all cards
- `POST /items/` - Create a new card
- `DELETE /items/{id}` - Delete a card

### Error Handling

- Connection errors are displayed at the top of the screen
- Failed API calls show user-friendly error messages

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Tips

- Use React DevTools browser extension for debugging
- Network tab in DevTools to monitor API calls
- Tailwind CSS IntelliSense extension for VS Code
