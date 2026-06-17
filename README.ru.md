# Weather Dashboard

Интерактивная панель погоды — поиск городов, прогнозы, избранное.

**[Демо](https://byteme6.github.io/weatherDashboard/)** · [English](./README.md)

## Возможности

- Текущая погода для нескольких городов
- Почасовой и недельный прогноз
- Детальная информация (влажность, ветер, давление)
- Сохранение избранных городов (требуется вход)
- Новостная секция
- Авторизация через Firebase
- Графики на Chart.js
- Анимации через Framer Motion и AOS

## Стек

| | |
|---|---|
| Фреймворк | React 19, Vite |
| Стили | SCSS, Bootstrap 5 |
| Авторизация | Firebase |
| API погоды | OpenWeatherMap |
| Графики | Chart.js, react-chartjs-2 |
| Анимации | Framer Motion, AOS |
| Уведомления | react-toastify |
| Деплой | GitHub Pages (Actions) |

## Установка

```bash
git clone https://github.com/ByteMe6/weatherDashboard
cd weatherDashboard
cp .env.example .env
npm install
npm run dev
```

Заполни `.env` своими Firebase-данными:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Деплой

Пуш в `master` — GitHub Actions автоматически собирает и деплоит на GitHub Pages.
