# 🔥 Firebase Backend Setup Guide

## What This Does
Your tournament app now has a **real-time backend database** using Firebase! This means:
- ✅ **All devices share the same data** - No more separate data per device
- ✅ **Real-time sync** - Changes appear instantly on all devices
- ✅ **Persistent storage** - Data is saved in the cloud
- ✅ **Free tier** - Google Firebase free plan is very generous

---

## 📋 Setup Steps

### Step 1: Create a Firebase Project

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `pallet-pes-tour` (or any name you like)
4. Disable Google Analytics (optional, not needed for this app)
5. Click **"Create project"**

### Step 2: Create a Realtime Database

1. In your Firebase project, click **"Realtime Database"** in the left sidebar
2. Click **"Create Database"**
3. Choose location: **Singapore** (closest to you) or **United States**
4. **Start in test mode** (we'll secure it later)
5. Click **"Enable"**

### Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **⚙️ gear icon** → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** `</>` to add a web app
4. Give it a nickname: `Pallet Pes Tour Web`
5. **Don't** check "Also set up Firebase Hosting"
6. Click **"Register app"**
7. You'll see a `firebaseConfig` object - **copy these values**

### Step 4: Configure Your Local Environment

1. In your project folder, create a file called `.env.local`:
   ```bash
   touch .env.local
   ```

2. Open `.env.local` and paste your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ```

3. Replace the values with your actual Firebase config values

### Step 5: Restart Your Dev Server

```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

The app will now use Firebase! 🎉

---

## 🔒 Security Rules (Important!)

Right now, your database is in **test mode** (anyone can read/write). Let's secure it:

### Option 1: Simple Password Protection (Recommended)

1. Go to **Realtime Database** → **Rules** tab
2. Replace the rules with:
   ```json
   {
     "rules": {
       "tournament_data": {
         ".read": true,
         ".write": "auth != null || data.exists()"
       }
     }
   }
   ```

### Option 2: Admin-Only Writes (More Secure)

If you want only admins to edit:
```json
{
  "rules": {
    "tournament_data": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

Then you'll need to add Firebase Authentication (more complex).

### Option 3: Keep Test Mode (Not Recommended for Production)

Test mode expires after 30 days. You'll get a warning email from Firebase.

---

## 🚀 Deploy to GitHub Pages

When deploying, you need to set environment variables in GitHub:

### Option A: Include Firebase Config in Build (Easier)

Create `.env.production`:
```bash
cp .env.local .env.production
```

This will be included in your build and deployed.

### Option B: Use GitHub Secrets (More Secure)

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add each environment variable as a secret
3. Update `.github/workflows/deploy.yml` to use these secrets

---

## 🧪 Testing

### Test Locally
1. Open the app in your browser: `http://localhost:5173`
2. Open the same URL in another browser or incognito window
3. Make a change in one window
4. **It should appear instantly in the other window!** ✨

### Test on Multiple Devices
1. Deploy: `npm run deploy`
2. Open the GitHub Pages URL on your phone
3. Open it on your computer
4. Changes on one device appear on the other! 🎉

---

## 📊 View Your Data

You can see and edit your data directly in Firebase:

1. Go to **Firebase Console** → **Realtime Database**
2. You'll see your tournament data in a tree structure
3. You can manually edit, add, or delete data here

---

## 🔄 Fallback Behavior

The app is smart:
- ✅ If Firebase is configured → Uses Firebase + localStorage backup
- ✅ If Firebase is NOT configured → Uses localStorage only (old behavior)
- ✅ If Firebase fails → Falls back to localStorage

So the app will work even if Firebase is down!

---

## 🐛 Troubleshooting

### "Firebase not configured" in console
- Make sure `.env.local` exists and has all variables
- Restart dev server after creating `.env.local`

### "Permission denied" errors
- Check your Firebase Realtime Database rules
- Make sure rules allow read/write access

### Data not syncing
- Check browser console for errors
- Make sure you're using the same Firebase project on all devices
- Check your internet connection

### Build errors
- Make sure all environment variables are set
- For production builds, create `.env.production`

---

## 💰 Firebase Free Tier Limits

Firebase free tier includes:
- ✅ **1 GB stored data** (you'll use < 1 MB)
- ✅ **10 GB/month downloaded** (plenty for this app)
- ✅ **100 simultaneous connections** (more than enough)

You won't hit these limits unless you have thousands of users! 🎉

---

## 🎯 Next Steps

1. ✅ Create Firebase project
2. ✅ Create Realtime Database
3. ✅ Get config values
4. ✅ Create `.env.local` file
5. ✅ Restart dev server
6. ✅ Test on multiple devices
7. ✅ Set security rules
8. ✅ Deploy to GitHub Pages

---

## 📞 Need Help?

If you get stuck:
1. Check the browser console for error messages
2. Check Firebase Console → Realtime Database → Data tab
3. Make sure your `.env.local` file has the correct values
4. Try the fallback: delete `.env.local` to use localStorage mode

---

**Ready to set it up? Follow the steps above and your tournament will be live with real-time sync!** 🚀
