import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Проверяем, находимся ли мы в продакшене (GitHub Pages)
const isProduction = import.meta.env.PROD;

// Конфигурация Firebase с fallback значениями для демо
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "demo-measurement-id"
};

// Проверяем, что все необходимые переменные окружения установлены
const isConfigValid = firebaseConfig.apiKey && 
                     firebaseConfig.authDomain && 
                     firebaseConfig.projectId &&
                     firebaseConfig.apiKey !== "demo-api-key";

if (!isConfigValid) {
  console.warn('Firebase configuration is incomplete or using demo values. Authentication features will be disabled.');
}

let app;
let auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Создаем mock объекты для предотвращения ошибок
  app = { name: 'mock-app' };
  auth = { currentUser: null };
}

export { auth };
export default app;