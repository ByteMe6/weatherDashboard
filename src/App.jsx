import "normalize.css";
import { Header } from "./Components/Header/Header";
import { Hero } from "./Components/Hero/Hero";
import { Weather } from "./Components/Weather/Weather";
import { News } from "./Components/News/news";
import { Slider } from "./Components/Slider/Slider";
import { Footer } from "./Components/Footer/Footer";
import { useAuth } from "./hooks/useAuth";
import React, { useState } from "react";


function App() {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const [login, setLogin] = useState(false);

  React.useEffect(() => {
    setLogin(!!user);
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header
        user={user}
        login={login}
        onLogin={signInWithGoogle}
        onLogout={logout}
      />
      <main>
        <Hero></Hero>
        <Weather></Weather>
        <News></News>
        <Slider></Slider>
      </main>
      <Footer />
    </>
  );
}

export default App;
