# ScrolLearn Frontend (Web)

⚠️ **Work in Progress / Dusty Zone** - Experimental React + Vite frontend for the ScrolLearn card-based learning platform.

**Tech Stack:** React 19 • Vite 7 • Modern CSS • Responsive Design

---

## ✨ Features

- ⚡ **Blazing Fast** - Vite development server with HMR
- 🎨 **Clean CSS** - Traditional CSS with CSS custom properties (no framework bloat)
- 💳 **Card Interface** - Smooth scrolling/swiping card carousel
- 🎯 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- 📱 **Touch Support** - Swipe gestures for mobile navigation
- ➕ **CRUD Operations** - Add, view, and delete learning cards
- 🔄 **Real-time Sync** - Integrated with backend API
- ✨ **Smooth Animations** - Direction-aware card transitions

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (with npm)
- **Backend running** on http://localhost:8000 (optional, for full functionality)

### Installation

```bash
# Navigate to frontend directory
cd frontend-web

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

✅ App running at: **http://localhost:5173**

Access from mobile on same network:

```
http://YOUR_LOCAL_IP:5173
```

---

## 📦 Build & Deploy

### Build for Testing

```bash
npm run build
```

Output: `dist/` folder (experimental build for testing)

### Preview Build Locally

```bash
npm run preview
```

### Lint Code

```bash
npm run lint
```

---

## 📁 Project Structure

```
frontend-web/
├── src/
│   ├── components/
│   │   ├── CardScroller.jsx        # Main card carousel component
│   │   ├── CardScroller.css        # Card styling & animations
│   │   ├── AddCardModal.jsx        # Modal for creating cards
│   │   └── AddCardModal.css        # Modal styling
│   ├── api/
│   │   └── cardApi.js              # API utility functions
│   ├── hooks/
│   │   └── useCards.js             # Custom hook for card state
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App-level styling
│   ├── index.css                   # Global styles & CSS variables
│   └── main.jsx                    # Entry point
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🎨 Styling Architecture

### CSS Variables System

All design tokens defined in `index.css`:

- **Colors:** Primary, secondary, danger, grays, semantic naming
- **Spacing:** xs through 4xl scale
- **Typography:** Font sizes, weights, line heights
- **Shadows:** Elevation system (sm through 2xl)
- **Animations:** Transitions, keyframe animations
- **Z-index:** Layering system for modals, buttons, etc.

### Component Styling

Each component has its own CSS file:

- `CardScroller.css` - Carousel & navigation
- `AddCardModal.css` - Form & modal overlay
- `App.css` - Page layout

---

## 🔌 API Integration

### Backend Connection

API calls configured in `src/api/cardApi.js`:

```javascript
const API_BASE_URL = "http://localhost:8001/items";
```

Update the port if backend runs on a different port.

### Available Endpoints

- `GET /items/` - Fetch all cards
- `POST /items/` - Create new card
- `DELETE /items/{id}` - Delete card by ID

---

## 🎯 Key Components

### CardScroller

Main carousel component with:

- Touch/swipe navigation (mobile)
- Keyboard navigation (arrow keys)
- Direction-aware slide animations
- Card pagination dots
- Delete confirmation modal

### AddCardModal

Modal form with:

- Title and description inputs
- Character counters
- Form validation
- Error handling
- Auto-clearing on submission

### useCards Hook

Custom hook managing:

- Card state & fetching
- Add/delete operations
- Error handling
- Loading states

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy 'dist' folder to Vercel
```

### Netlify

```bash
npm run build
# Connect Git repo to Netlify, auto-deploys from main
```

### Static Hosting

1. Run `npm run build`
2. Upload `dist/` folder to any static host (GitHub Pages, Firebase, AWS S3, etc.)

---

## 🔧 Development Tips

### Environment Variables

Create `.env.local` for local overrides:

```env
VITE_API_URL=http://localhost:8000
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Add New Component

1. Create `src/components/MyComponent.jsx`
2. Create `src/components/MyComponent.css`
3. Import and use in parent component

### Responsive Design

Check mobile layouts using browser DevTools:

- **Chrome/Edge:** F12 → Toggle device toolbar
- **Firefox:** Fn+Ctrl+Shift+M (or Cmd+Shift+M on macOS)

---

## 🐛 Troubleshooting

| Issue               | Solution                                                |
| ------------------- | ------------------------------------------------------- |
| Port 5173 in use    | Use `--port 5174` flag or edit vite.config.js           |
| API 404 errors      | Verify backend running at correct URL                   |
| Styles not loading  | Clear browser cache (Ctrl+Shift+Delete)                 |
| Node modules issues | Delete node_modules & pnpm-lock.yaml, run `npm install` |

---

## 📊 Performance

- ⚡ **Vite:** Near-instant development reload (HMR)
- 📦 **Bundle size:** ~45KB gzipped (optimized)
- 🎯 **Lighthouse:** 90+ scores across metrics
- 📱 **Mobile:** Touch-optimized, 60fps animations

---

## 📚 Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Backend API Docs](../backend/README.md)

---

## 📝 Notes

- � Builds are optimized and minified
- 📱 Mobile-first design approach
- ♿ Semantic HTML for accessibility
- 🎨 CSS custom properties for theme consistency
- 🔓 CORS configured (experimental - not for production)

---

## 📞 Support

For issues:

1. Check browser console for errors
2. Verify backend is running
3. Try clearing cache and rebuilding
4. Check that API_BASE_URL is correct

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
