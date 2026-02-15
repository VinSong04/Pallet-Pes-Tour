import { ref, set, get, onValue, off } from 'firebase/database';
import { database } from './config';

const TOURNAMENT_KEY = 'tournament_data';

/**
 * Save tournament state to Firebase
 */
export async function saveStateToFirebase(state) {
    // If Firebase is not configured, skip
    if (!database) {
        return false;
    }

    try {
        const tournamentRef = ref(database, TOURNAMENT_KEY);
        await set(tournamentRef, state);
        console.log('✅ Data saved to Firebase');
        return true;
    } catch (error) {
        console.error('❌ Error saving to Firebase:', error);
        return false;
    }
}

/**
 * Load tournament state from Firebase (one-time read)
 */
export async function loadStateFromFirebase(template) {
    // If Firebase is not configured, return template
    if (!database) {
        return null; // Return null to indicate Firebase is not available
    }

    try {
        const tournamentRef = ref(database, TOURNAMENT_KEY);
        const snapshot = await get(tournamentRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log('✅ Data loaded from Firebase');
            return data;
        } else {
            console.log('ℹ️ No data in Firebase, using template');
            // Initialize Firebase with template data
            await saveStateToFirebase(template);
            return template;
        }
    } catch (error) {
        console.error('❌ Error loading from Firebase:', error);
        return template;
    }
}

/**
 * Subscribe to real-time updates from Firebase
 * Returns an unsubscribe function
 */
export function subscribeToFirebase(callback) {
    // If Firebase is not configured, return a no-op unsubscribe function
    if (!database) {
        return () => { }; // No-op unsubscribe
    }

    const tournamentRef = ref(database, TOURNAMENT_KEY);

    const unsubscribe = onValue(tournamentRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log('🔄 Real-time update from Firebase');
            callback(data);
        }
    }, (error) => {
        console.error('❌ Firebase subscription error:', error);
    });

    return () => {
        off(tournamentRef);
        console.log('🔌 Unsubscribed from Firebase');
    };
}

/**
 * Reset tournament data to template
 */
export async function resetFirebaseData(template) {
    // If Firebase is not configured, just return the template
    if (!database) {
        return template;
    }

    try {
        const tournamentRef = ref(database, TOURNAMENT_KEY);
        await set(tournamentRef, template);
        console.log('🔄 Firebase data reset to template');
        return template;
    } catch (error) {
        console.error('❌ Error resetting Firebase data:', error);
        throw error;
    }
}

