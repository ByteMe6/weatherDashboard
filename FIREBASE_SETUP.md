# 🔥 Настройка Firebase

## 📋 Шаг 1: Получение Firebase конфигурации

1. **Перейдите в Firebase Console:** https://console.firebase.google.com/
2. **Создайте новый проект** или выберите существующий
3. **Добавьте веб-приложение:**
   - Нажмите "Add app" → "Web"
   - Введите название приложения
   - Нажмите "Register app"
4. **Скопируйте конфигурацию:**
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456",
     measurementId: "G-XXXXXXXXXX"
   };
   ```

## 📋 Шаг 2: Настройка локальной разработки

1. **Откройте файл `.env`** в корне проекта
2. **Замените значения** на ваши реальные:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## 📋 Шаг 3: Настройка GitHub Pages

1. **Перейдите в настройки репозитория:**
   - https://github.com/ByteMe6/weatherDashboard/settings

2. **Добавьте GitHub Secrets:**
   - Перейдите в "Secrets and variables" → "Actions"
   - Нажмите "New repository secret"
   - Добавьте каждую переменную:

   ```
   FIREBASE_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   FIREBASE_PROJECT_ID=your-project
   FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=123456789012
   FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## 📋 Шаг 4: Настройка аутентификации

1. **В Firebase Console** перейдите в "Authentication"
2. **Нажмите "Get started"**
3. **Включите методы аутентификации:**
   - Email/Password
   - Google
4. **Настройте Google OAuth:**
   - Включите Google provider
   - Добавьте ваш домен в "Authorized domains"

## ✅ Проверка

После настройки:
- **Локально:** `npm run dev` - Firebase должен работать
- **GitHub Pages:** После пуша в master - Firebase должен работать

## 🔧 Устранение проблем

Если Firebase не работает:
1. Проверьте, что все переменные окружения правильные
2. Убедитесь, что GitHub Secrets добавлены
3. Проверьте, что домен добавлен в Firebase Console 