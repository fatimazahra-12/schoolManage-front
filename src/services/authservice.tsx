/**
 * Firebase Authentication Service
 * Handles user registration, login, and auth state management
 * 
 * Requirements:
 * 1. Install firebase: npm install firebase
 * 2. Add Firebase credentials to .env:
 *    VITE_FIREBASE_API_KEY=...
 *    VITE_FIREBASE_AUTH_DOMAIN=...
 *    VITE_FIREBASE_PROJECT_ID=...
 *    VITE_FIREBASE_STORAGE_BUCKET=...
 *    VITE_FIREBASE_MESSAGING_SENDER_ID=...
 *    VITE_FIREBASE_APP_ID=...
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import type { User, AuthResponse, SignupFormData } from '../types/auth';

// Firebase configuration (from environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Register a new user with email and password
 * @param formData - Signup form data (nom, email, password)
 * @returns AuthResponse with user data or error
 */
export const signupUser = async (formData: SignupFormData): Promise<AuthResponse> => {
  try {
    const { nom, email, motDePasse } = formData;

    // Create Firebase user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
    const firebaseUser = userCredential.user;

    // Update profile with display name (nom)
    await updateProfile(firebaseUser, {
      displayName: nom,
    });

    // Construct User object matching our User type
    const user: User = {
      uid: firebaseUser.uid,
      nom: nom,
      email: email,
      roleId: 'student', // Default role (will be configurable later)
      isVerified: false, // Email verification can be sent
      isActive: true,
      createdAt: new Date(),
    };

    // Send verification email immediately after signup
    try {
      await sendEmailVerification(firebaseUser);
    } catch (err) {
      const message = (err as Error)?.message || 'Failed to send verification email';
      console.error('Verification email error:', err);
      // Continue signup flow but include a message for the UI
      return {
        success: true,
        user,
        message: `Compte créé, mais l'email de vérification n'a pas pu être envoyé: ${message}`,
      };
    }

    // TODO: Sync with backend API
    // const response = await syncUserToBackend({
    //   nom: user.nom,
    //   email: user.email,
    //   roleId: user.roleId,
    //   isVerified: user.isVerified,
    //   isActive: user.isActive,
    //   firebaseUid: user.uid,
    // });

    return {
      success: true,
      user,
      message: 'Signup successful! Please verify your email.',
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let errorMessage = 'An error occurred during signup';

    // Handle specific Firebase errors
    if (firebaseError.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already in use';
    } else if (firebaseError.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak (min 6 characters)';
    } else if (firebaseError.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (firebaseError.message) {
      errorMessage = firebaseError.message;
    }

    console.error('Signup error:', firebaseError);

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Login user with email and password
 * @param email - User email
 * @param password - User password
 * @returns AuthResponse with user data or error
 */
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const user: User = {
      uid: firebaseUser.uid,
      nom: firebaseUser.displayName || '',
      email: firebaseUser.email || '',
      isVerified: firebaseUser.emailVerified,
      isActive: true,
    };

    return {
      success: true,
      user,
      message: 'Login successful!',
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let errorMessage = 'Login failed';

    if (firebaseError.code === 'auth/user-not-found') {
      errorMessage = 'User not found';
    } else if (firebaseError.code === 'auth/wrong-password') {
      errorMessage = 'Invalid password';
    } else if (firebaseError.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (firebaseError.message) {
      errorMessage = firebaseError.message;
    }

    console.error('Login error:', firebaseError);

    return {
      success: false,
      error: errorMessage,
    };
  }
};

/**
 * Logout current user
 * @returns AuthResponse
 */
export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Logout successful!',
    };
  } catch (error: unknown) {
    const firebaseError = error as { message?: string };
    return {
      success: false,
      error: firebaseError.message || 'Logout failed',
    };
  }
};

/**
 * Get current authenticated user
 * @returns Current Firebase user or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Send a verification email to the currently authenticated user
 * Returns true on success, false on failure
 */
export const sendVerificationEmailTo = async (): Promise<boolean> => {
  try {
    const current = auth.currentUser;
    if (!current) throw new Error('Utilisateur non connecté');
    await sendEmailVerification(current);
    return true;
  } catch (err) {
    console.error('sendVerificationEmailTo error:', err);
    return false;
  }
};
