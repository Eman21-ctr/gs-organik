// File: src/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 1. Konfigurasi diambil dari environment variables (.env.local)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 2. Inisialisasi aplikasi Firebase
const app = initializeApp(firebaseConfig);

// 3. Inisialisasi layanan yang akan kita gunakan dan ekspor
//    agar bisa diimpor di file lain (misalnya di AppContext.jsx).
export const db = getFirestore(app);        // Untuk Database Firestore
export const auth = getAuth(app);           // Untuk Autentikasi (login, logout)
export const storage = getStorage(app);     // Untuk Storage (upload gambar, dll.)