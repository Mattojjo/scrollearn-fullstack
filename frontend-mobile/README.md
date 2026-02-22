# ScrolLearn Mobile App

React Native mobile application for ScrolLearn - a card-based learning platform.

## Features

- 📱 iOS and Android support
- 💳 Swipeable card interface
- ➕ Add, view, and delete cards
- 🔄 Offline-first with syncing
- 🎯 Bottom tab navigation
- 📡 Real-time backend integration

## Prerequisites

- Node.js 18+
- React Native CLI
- XCode (for iOS development)
- Android Studio (for Android development)

## Setup

### Installation

```bash
cd frontend-mobile
npm install
# or
yarn install
```

### iOS Setup

```bash
cd ios
pod install
cd ..
npm run ios
```

### Android Setup

```bash
npm run android
```

### Development

```bash
npm start
```

Then follow the prompts to run on iOS or Android.

## Configuration

The backend API URL is configured in [src/utils/api.ts](src/utils/api.ts):

```typescript
const API_BASE_URL = "http://localhost:8000";
```

For production, update this to your backend server URL:

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
- `npm run build:ios` - Build iOS app for production
- `npm run build:android` - Build Android app for production
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

## Building for Production

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
