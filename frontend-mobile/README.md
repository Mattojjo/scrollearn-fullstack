# ScrolLearn Mobile App

⚠️ **Work in Progress / Dusty Zone** - Experimental React Native app for iOS and Android

**Status:** Early Development | **Tech Stack:** React Native • Expo • TypeScript

---

## ✨ Planned Features

- 📱 **iOS & Android** - Native mobile experience
- 💳 **Card Interface** - Swipeable card carousel
- ➕ **CRUD Operations** - Add, view, and delete cards
- 🔄 **Offline Support** - Works without internet
- 📡 **Auto-Sync** - Syncs when connection restored
- 🎯 **Bottom Navigation** - Tab-based app navigation
- ✨ **Native Feel** - Platform-specific UI/UX
- 🔐 **Secure Storage** - Local encrypted storage

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**
- **npm or yarn**
- **Expo CLI** (for development)
- **iPhone/Android device** or emulator

### Installation

```bash
# Navigate to mobile directory
cd frontend-mobile

# Install dependencies
npm install
```

### Development with Expo

```bash
npm start
```

Then:

- **iPhone:** Open Camera app → Scan QR code
- **Android:** Open Expo Go app → Scan QR code

---

## 📱 Platform-Specific Setup

### iOS Development

```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..

# Run on iOS simulator
npm run ios
```

### Android Development

```bash
# Run on Android emulator
npm run android
```

---

## 📁 Project Structure

```
frontend-mobile/
├── src/
│   ├── screens/
│   │   ├── CardScreen.tsx          # Main card carousel
│   │   └── AddCardScreen.tsx       # Add card form
│   ├── components/
│   │   ├── CardCard.tsx            # Card component
│   │   └── Navigation.tsx          # Bottom tabs
│   ├── hooks/
│   │   └── useCards.ts             # Card state logic
│   ├── utils/
│   │   └── api.ts                  # API integration
│   ├── styles/
│   │   └── theme.ts                # Theme & colors
│   └── App.tsx                     # App entry point
├── ios/                            # iOS native code
├── android/                        # Android native code
├── app.json                        # Expo config
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🔌 Shared Code

### Reusing Web Components

Share logic between web and mobile:

```
scrollearn-fullstack/
├── frontend-web/
├── frontend-mobile/
└── shared/                    ← Shared utilities
    ├── api/                   ← cardApi.js (works with RN)
    └── hooks/                 ← useCards.js (React - universal)
```

The `useCards` hook works directly in React Native since it's framework-agnostic!

---

## 🎨 Theme & Styling

### Colors

```javascript
const colors = {
  primary: "#9333ea", // Purple
  secondary: "#3b82f6", // Blue
  danger: "#ef4444", // Red
  background: "#0f172a", // Dark
  surface: "#1e293b", // Slate
};
```

### Typography

- **Heading:** 28px, bold
- **Body:** 16px, normal
- **Small:** 12px, regular

---

## 📦 Dependencies

| Package           | Purpose                      |
| ----------------- | ---------------------------- |
| react-native      | Cross-platform framework     |
| expo              | Development tools & services |
| @react-navigation | Navigation library           |
| axios             | HTTP client                  |
| AsyncStorage      | Local storage                |

---

## 🚀 Deployment

### iOS (App Store)

```bash
eas build --platform ios --auto-submit
```

### Android (Google Play)

```bash
eas build --platform android --auto-submit
```

---

## 🔧 Development Workflow

### Hot Reload

Changes auto-reload in development:

```bash
npm start
# Update code in editor
# App updates automatically
```

### Debugging

Press `d` in terminal after running `npm start`:

- View error logs
- Debug JavaScript
- Inspect element tree

### Testing

```bash
npm run test
```

---

## 🐛 Troubleshooting

| Issue                   | Solution                             |
| ----------------------- | ------------------------------------ |
| App won't load          | Clear Expo cache: `npm start -- -c`  |
| Android emulator issues | Restart Android Studio emulator      |
| iOS Pod errors          | Run `cd ios && pod install && cd ..` |
| API 404 errors          | Verify backend URL in `utils/api.ts` |

---

## 🌐 Backend Integration

### Configure API URL

Edit `src/utils/api.ts`:

```typescript
const API_BASE_URL = "http://YOUR_BACKEND_URL:8000";
```

For local dev on emulator:

- **iOS Simulator:** Use `localhost:8000`
- **Android Emulator:** Use `10.0.2.2:8000`
- **Physical Device:** Use your computer's IP address

---

## 📚 Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Backend API Docs](../backend/README.md)
- [Web Frontend Docs](../frontend-web/README.md)

---

## 📝 Notes

- 🏗️ Architecture uses hooks for state management
- 📱 Platform-specific code in separate files (_.ios.ts, _.android.ts)
- 🎯 Bottom tab navigation for intuitive mobile UX
- 🔐 Credentials stored securely with AsyncStorage
- 📡 Network requests are retried on failure
- ♿ Accessible components with proper labels

---

## 🗺️ Roadmap

- [ ] Offline-first with data sync
- [ ] Biometric authentication
- [ ] Dark mode toggle
- [ ] Import/export cards
- [ ] Spaced repetition algorithm
- [ ] Progress tracking
- [ ] Push notifications
- [ ] Cloud backup

---

## 📞 Support

For help:

1. Check Expo documentation
2. Review error messages in terminal
3. Clear cache and rebuild
4. Check backend connection

---

## 🤝 Contributing

To add features:

1. Create branch from `main`
2. Make changes to `src/` folder
3. Test on both platforms
4. Submit pull request

---

*Last Updated: February 2026*bash
npm start

````

Then follow the prompts to run on iOS or Android.

## Configuration

The backend API URL is configured in [src/utils/api.ts](src/utils/api.ts):

```typescript
const API_BASE_URL = "http://localhost:8000";
````

For testing, update this to your backend server URL:

```typescript
const API_BASE_URL = "https://api.yourdomain.com";
```

## Project Structure

```
frontend-mobile/
├── src/
│   ├── screens/
│   │   ├── CardsScreen.tsx      # Main cards list screen
│   │   ├── AddCardScreen.tsx    # Add new card screen
│   │   └── SettingsScreen.tsx   # Settings screen
│   ├── components/
│   │   └── CardItem.tsx         # Card list item component
│   ├── utils/
│   │   └── api.ts              # API client and functions
│   └── App.tsx                 # Main app component with navigation
├── index.js                    # Entry point
├── app.json                    # App configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # This file
```

## Available Scripts

- `npm start` - Start the Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run build:ios` - Build iOS app for testing
- `npm run build:android` - Build Android app for testing
- `npm run lint` - Run ESLint

## API Integration

The mobile app communicates with the backend using the API client in `src/utils/api.ts`:

### Endpoints Used

- `GET /items/` - Fetch all cards
- `POST /items/` - Create a new card
- `GET /items/{id}` - Get a single card
- `PUT /items/{id}` - Update a card
- `DELETE /items/{id}` - Delete a card

## Development Tips

- Use `React DevTools` browser extension (if running on web)
- Check the Metro bundler console for errors
- Use React Native Debugger for debugging
- Test on both iOS and Android devices
- Use hot reloading during development (Cmd+R on iOS simulator)

## Troubleshooting

### Connection Issues

If the app can't connect to the backend:

1. Check that the backend is running on `http://localhost:8000`
2. For Android emulator, use `10.0.2.2` instead of `localhost`
3. Verify CORS is enabled on the backend
4. Check network connectivity on the device/emulator

### Build Issues

Clear cache and rebuild:

```bash
npm start -- --reset-cache
```

## Building for Testing

### iOS

```bash
cd ios
xcodebuild -workspace ScrolLearnMobile.xcworkspace \
  -scheme ScrolLearnMobile \
  -configuration Release
```

### Android

```bash
cd android
./gradlew assembleRelease
```

## License

MIT
