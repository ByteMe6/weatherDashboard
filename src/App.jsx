import "normalize.css";
import { Header } from "./Components/Header/Header";
import { Hero } from "./Components/Hero/Hero";
import { Weather } from "./Components/Weather/Weather";
import { News } from "./Components/News/news";
import { Slider } from "./Components/Slider/Slider";
import { Footer } from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
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
