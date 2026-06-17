# Weather Dashboard

Interactive weather dashboard — search cities, track forecasts, save favorites.

**[Live Demo](https://byteme6.github.io/weatherDashboard/)** · [Русский](./README.ru.md)

## Features

- Current weather for multiple cities
- Hourly and weekly forecasts
- Detailed weather breakdown (humidity, wind, pressure)
- Save favorite cities (requires login)
- News section
- Firebase authentication
- Charts powered by Chart.js
- Smooth animations with Framer Motion and AOS

## Tech Stack

| | |
|---|---|
| Framework | React 19, Vite |
| Styling | SCSS, Bootstrap 5 |
| Auth | Firebase |
| Weather API | OpenWeatherMap |
| Charts | Chart.js, react-chartjs-2 |
| Animations | Framer Motion, AOS |
| Notifications | react-toastify |
| Deploy | GitHub Pages (Actions) |

## Setup

```bash
git clone https://github.com/ByteMe6/weatherDashboard
cd weatherDashboard
cp .env.example .env
npm install
npm run dev
```

Fill in `.env` with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Deploy

Push to `master` — GitHub Actions builds and deploys to GitHub Pages automatically.
