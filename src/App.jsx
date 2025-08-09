import "normalize.css";
import { Header } from "./Components/Header/Header";
import { Hero } from "./Components/Hero/Hero";
import { Weather } from "./Components/Weather/Weather";
import { News } from "./Components/News/News";
import { Slider } from "./Components/Slider/Slider";
import { Footer } from "./Components/Footer/Footer";
import { useAuth } from "./hooks/useAuth";
import React, { useState } from "react";
import { CityProvider } from "./Context/cityContext";
import "./marginTop60px.css"; //не трогать

import { Fav } from "./Components/Fauvorite/Fav";

function App() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const [login, setLogin] = useState(false);
  const [favoriteWeather, setFavoriteWeather] = useState([]);

  React.useEffect(() => {
    setLogin(!!user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleFavorite = (day, city) => {
    setFavoriteWeather(prev => {
      const exists = prev.find(item => item.dt === day.dt && item.city === city);
      if (exists) {
        return prev.filter(item => !(item.dt === day.dt && item.city === city));
      } else {
        return [...prev, { ...day, city }];
      }
    });
  };

  const removeFromFavorite = (day, city) => {
    setFavoriteWeather(prev => prev.filter(item => !(item.dt === day.dt && item.city === city)));
  };

  return (
    <>
      <Header
        user={user}
        login={login}
        onLogin={signInWithGoogle}
        onLogout={logout}
        favoriteWeather={favoriteWeather}
        removeFromFavorite={removeFromFavorite}
        isLogin={login}
      />
      <main>
        <CityProvider>
          <Hero />
          <Weather
            isLogin={login}
            favoriteWeather={favoriteWeather}
            toggleFavorite={toggleFavorite}
            removeFromFavorite={removeFromFavorite}
          />
        </CityProvider>
        <News />
        <Slider />
      </main>
      <Footer />
    </>
  );
}

export default App;
