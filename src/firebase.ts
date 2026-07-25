import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';

import firebaseConfigJson from '../firebase-applet-config.json';

// Firebase web config is not a secret (it ships in the client bundle); it is
// protected by Firebase security rules + authorized domains, not by hiding it.
// Values come from Vite build-time env (set VITE_FIREBASE_* in AI Studio /
// Cloud Build), with firebase-applet-config.json as fallback for AI Studio runtime.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? firebaseConfigJson.apiKey ?? 'REPLACE_WITH_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? firebaseConfigJson.authDomain ?? 'REPLACE.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? firebaseConfigJson.projectId ?? 'REPLACE_PROJECT_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? firebaseConfigJson.appId ?? 'REPLACE_APP_ID',
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
