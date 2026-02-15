// Firebase Configuration
// Configuration is loaded from environment variables (.env.local)
// See .env.example for the required variables

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey &&
    firebaseConfig.databaseURL &&
    !firebaseConfig.databaseURL.includes('your-project-id') &&
    !firebaseConfig.apiKey.includes('your-api-key');

let database = null;

// Only initialize Firebase if properly configured
if (isFirebaseConfigured) {
    try {
        const app = initializeApp(firebaseConfig);
        database = getDatabase(app);
        console.log('✅ Firebase initialized successfully');
    } catch (error) {
        console.warn('⚠️ Firebase initialization failed:', error.message);
        console.log('📦 Falling back to localStorage mode');
    }
} else {
    console.log('ℹ️ Firebase not configured - using localStorage mode');
    console.log('💡 To enable real-time sync, add Firebase credentials to .env.local');
}

export { database };
