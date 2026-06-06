# Weather Dashboard

Интерактивная панель погоды, созданная с использованием React и Vite.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Деплой на GitHub Pages
npm run deploy
```

## 🌐 Демо

Сайт доступен по адресу: **https://byteme6.github.io/weatherDashboard/**

## 🔧 Настройка Firebase


### Для локальной разработки:
1. Скопируйте `firebase-config.example` в `.env`
2. Замените значения на ваши реальные Firebase конфигурации

### Для GitHub Pages:
1. Перейдите в Settings → Secrets and variables → Actions
2. Добавьте следующие secrets:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `FIREBASE_MEASUREMENT_ID`

## 🛠 Технологии

- React 19
- Vite
- SCSS
- Firebase
- Bootstrap
- React Icons

## 📁 Структура проекта

```
src/
├── Components/          # React компоненты
│   ├── Container/      # Контейнер приложения
│   ├── Footer/         # Подвал
│   ├── Header/         # Заголовок с авторизацией
│   ├── Hero/           # Главная секция
│   ├── News/           # Новости
│   ├── Slider/         # Слайдер
│   └── Weather/        # Компоненты погоды
├── Context/            # React контексты
├── hooks/              # Пользовательские хуки
└── images/             # Изображения и видео
```

## 🚀 Деплой

### Автоматический деплой
При каждом пуше в ветку `master` GitHub Actions автоматически собирает и деплоит проект.

### Ручной деплой
```bash
npm run deploy
```

## ✨ Особенности

- Адаптивный дизайн
- Интеграция с Firebase для авторизации
- Анимированные погодные эффекты
- Прогноз погоды на неделю
- Детальная информация о погодных условиях
