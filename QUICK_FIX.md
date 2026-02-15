# 🔧 Quick Fix - Firebase Setup

## The Problem
Your `.env.local` and `.env.production` files are empty, so the app can't connect to Firebase.

## The Solution (Choose One)

### Option 1: Set Up Firebase (Recommended for Real-Time Sync)

**Step 1: Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Name it: `pallet-pes-tour`
4. Disable Google Analytics (optional)
5. Click "Create project"

**Step 2: Create Realtime Database**
1. In Firebase Console, click "Realtime Database" in sidebar
2. Click "Create Database"
3. Choose location: **Singapore** (closest to you)
4. Start in **test mode**
5. Click "Enable"

**Step 3: Get Your Config**
1. Click ⚙️ gear icon → "Project settings"
2. Scroll to "Your apps" section
3. Click the Web icon `</>` to add a web app
4. Nickname: `Pallet Pes Tour Web`
5. Click "Register app"
6. **Copy the config values**

**Step 4: Fill in `.env.local`**
Open `/Users/kvinn/Desktop/PESTOUR/.env.local` and replace with your actual values:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

**Step 5: Restart Dev Server**
```bash
# Stop current server (Ctrl+C in terminal)
npm run dev
```

---

### Option 2: Use Without Firebase (Local Storage Only)

If you don't want to set up Firebase right now, you can disable it:

**Step 1: Check if the app has fallback mode**
The app should automatically fall back to localStorage if Firebase isn't configured.

**Step 2: Verify it's working**
1. Open http://localhost:5174/Pallet-Pes-Tour/
2. Check browser console - you should see a message about using localStorage
3. The app will work, but data won't sync across devices

---

## Current Status

✅ Dev server is running on: http://localhost:5174/Pallet-Pes-Tour/
❌ Firebase not configured (`.env.local` is empty)
⚠️ App is likely using localStorage fallback mode

## Next Steps

1. **If you want real-time sync**: Follow Option 1 above
2. **If you just want it to work locally**: Option 2 (it should already be working)

## Test It

Open the app in your browser and check the console:
- If you see "Firebase not configured" → Using localStorage (works locally)
- If you see "Connected to Firebase" → Real-time sync enabled! 🎉
