import { createContext, useState, useEffect } from "react";

import { ModalMessage } from "../Components/Hero/ModalMessage/ModalMessage";

const CityContext = createContext(null);

export const CityProvider = ({ children }) => {
  const [showWeeklyData, setShowWeeklyData] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [city, setCity] = useState('');

  const [wheatherData, setWheatherData] = useState(null)

  const [seeMoreData, setseeMoreData] = useState([])

  const seeMore = (day) => {
    if (!wheatherData) return;

    const dataForDay = wheatherData.list.filter(item => item.dt_txt.startsWith(day));
    setseeMoreData(dataForDay);
  };

  const seeWeklyData = ()=> {
    if (showWeeklyData) return;
    setShowWeeklyData(true)
  }

  useEffect(() => {
    setseeMoreData([])
  }, [city])

  const selectCity = (cityName) => {
    setCity(cityName)
  };

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b6bbc0579c03f40c19f334807788b408&units=metric&lang=en`);
        const data = await res.json();

        if (data.cod !== "200") {
          setErrorMessage("Місто не знайдено. Перевірте назву.");
          setWheatherData(null);
          return;
        }

        setWheatherData(data);

      } catch (error) {
        console.error("Помилка при запиті погоди:", error);
        setErrorMessage("Сталася помилка при отриманні даних.");
        setWheatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  const currentWeather = wheatherData?.list?.[0]

  return (
    <CityContext.Provider value={{ selectCity, city, wheatherData, seeMore, seeMoreData, currentWeather,seeWeklyData, showWeeklyData}}>
      {children}
      {errorMessage && (
        <ModalMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </CityContext.Provider>
  );
};
export { CityContext };