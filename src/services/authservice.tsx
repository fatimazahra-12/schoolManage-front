/**
 * Firebase Authentication Service
 * Handles user registration, login, and auth state management
 * 
 * Requirements:
 * 1. Install firebase: npm install firebase
 * 2. Add Firebase credentials to .env:
 *    VITE_API_KEY=...
 *    VITE_AUTH_DOMAIN=...
 *    VITE_PROJECT_ID=...
 *    VITE_STORAGE_BUCKET=...
 *    VITE_MESSAGING_SENDER_ID=...
 *    VITE_APP_ID=...
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth';
import type { User, AuthResponse, SignupFormData } from '../types/auth';

// Firebase configuration (from environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || '',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_APP_ID || '',
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

    try {
      await sendEmailVerification(firebaseUser);
    } catch (err) {
      const firebaseError = err as { code?: string; message?: string };
      return {
        success: false,
        error: `Compte créé, mais l'email de vérification n'a pas pu être envoyé: ${firebaseError.message || 'Erreur inconnue'}`,
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
      message: 'Inscription réussie ! Un email de vérification a été envoyé.',
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let errorMessage = 'Une erreur s\'est produite lors de l\'inscription';

    if (firebaseError.code === 'auth/email-already-in-use') {
      errorMessage = 'Cet email est déjà utilisé';
    } else if (firebaseError.code === 'auth/weak-password') {
      errorMessage = 'Le mot de passe est trop faible (minimum 6 caractères)';
    } else if (firebaseError.code === 'auth/invalid-email') {
      errorMessage = 'Adresse email invalide';
    } else if (firebaseError.message) {
      errorMessage = firebaseError.message;
    }

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
      message: 'Connexion réussie',
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let errorMessage = 'Échec de la connexion';

    if (firebaseError.code === 'auth/user-not-found') {
      errorMessage = 'Utilisateur introuvable';
    } else if (firebaseError.code === 'auth/wrong-password') {
      errorMessage = 'Mot de passe invalide';
    } else if (firebaseError.code === 'auth/invalid-email') {
      errorMessage = 'Adresse email invalide';
    } else if (firebaseError.message) {
      errorMessage = firebaseError.message;
    }

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
      message: 'Déconnexion réussie',
    };
  } catch (error: unknown) {
    const firebaseError = error as { message?: string };
    return {
      success: false,
      error: firebaseError.message || 'Échec de la déconnexion',
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

export const sendVerificationEmailTo = async (): Promise<boolean> => {
  try {
    const current = auth.currentUser;
    if (!current) throw new Error('Utilisateur non connecté');
    await sendEmailVerification(current);
    return true;
  } catch (err) {
    return false;
  }
};

export const sendPasswordResetTo = async (email: string): Promise<AuthResponse> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Un email de réinitialisation a été envoyé. Vérifiez votre boîte mail et vos spams.',
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let errorMessage = 'Impossible d\'envoyer l\'email de réinitialisation';

    if (firebaseError.code === 'auth/user-not-found') {
      errorMessage = 'Aucun compte associé à cet email';
    } else if (firebaseError.code === 'auth/invalid-email') {
      errorMessage = 'Adresse email invalide';
    } else if (firebaseError.message) {
      errorMessage = firebaseError.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const verifyResetCode = async (oobCode: string): Promise<AuthResponse> => {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);
    return {
      success: true,
      message: email,
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let errorMessage = 'Lien de réinitialisation invalide ou expiré';
    if (firebaseError.message) errorMessage = firebaseError.message;

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const confirmResetPassword = async (oobCode: string, newPassword: string): Promise<AuthResponse> => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return {
      success: true,
      message: 'Mot de passe réinitialisé avec succès',
    };
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    let errorMessage = 'Échec de la réinitialisation du mot de passe';
    if (firebaseError.code === 'auth/weak-password') {
      errorMessage = 'Mot de passe trop faible (minimum 6 caractères)';
    } else if (firebaseError.message) {
      errorMessage = firebaseError.message;
    }
    return {
      success: false,
      error: errorMessage,
    };
  }
};