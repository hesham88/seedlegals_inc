import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';

// Firebase web config is not a secret (it ships in the client bundle); it is
// protected by Firebase security rules + authorized domains, not by hiding it.
// Values come from Vite build-time env (set VITE_FIREBASE_* in AI Studio /
// Cloud Build), with a placeholder fallback so the app still builds locally.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'REPLACE_WITH_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'REPLACE.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'REPLACE_PROJECT_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? 'REPLACE_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<void> {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error('[auth] Google sign-in failed:', err);
  }
}

export function signOutUser(): Promise<void> {
  return signOut(auth);
}

export type { User };
