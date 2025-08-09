import { createContext, useState, useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CityContext = createContext(null);

export const CityProvider = ({ children }) => {
  const [selectedCityForWeekly, setSelectedCityForWeekly] = useState(null);
  const [showWeeklyData, setShowWeeklyData] = useState(false)
  const [city, setCity] = useState('');

  const [wheatherData, setWheatherData] = useState([])
  const [seeMoreData, setseeMoreData] = useState([])
  const [hourlyDataForDay, setHourlyDataForDay] = useState([]);

  const removeCity = (cityName) => {
    setWheatherData(prev => prev.filter(item => item.city.toLowerCase() !== cityName.toLowerCase()));
  };

  const selectCityForWeekly = (cityName) => {
    setSelectedCityForWeekly(cityName);
    setShowWeeklyData(true);
    setHourlyDataForDay([]);
    setseeMoreData([]);
  };

  const seeMore = (cityName, day) => {
    if (!wheatherData.length) return;

    const cityData = wheatherData.find(item => item.city.toLowerCase() === cityName.toLowerCase());

    if (!cityData) return;

    const dataForDay = cityData.list.filter(item => item.dt_txt.startsWith(day));
    setseeMoreData(dataForDay);
    setShowWeeklyData(false);
    setHourlyDataForDay([]);
  };

  const seeHourlyWeather = (cityName, dateTime) => {
    if (!wheatherData.length) return;

    const cityData = wheatherData.find(item => item.city.toLowerCase() === cityName.toLowerCase());
    if (!cityData) return;

    const startTime = new Date(dateTime).getTime();
    const endTime = startTime + 24 * 60 * 60 * 1000;

    const next24Hours = cityData.list.filter(item => {
      const itemTime = new Date(item.dt_txt).getTime();
      return itemTime >= startTime && itemTime <= endTime;
    });

    setHourlyDataForDay(next24Hours);
    setShowWeeklyData(false);
    setseeMoreData([]);
  };

  const seeWeklyData = () => {
    setShowWeeklyData(true);
    setHourlyDataForDay([]);
    setseeMoreData([]);
  };

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
          toast.error("Місто не знайдено. Перевірте назву.");
          return;
        }

        setWheatherData(prev => {
          const filtered = prev.filter(item => item.city.toLowerCase() !== data.city.name.toLowerCase());
          return [{ city: data.city.name, list: data.list }, ...filtered];
        });


      } catch (error) {
        console.error("Помилка при запиті погоди:", error);
        toast.error("Сталася помилка при отриманні даних.");
      }
    };

    fetchWeather();
  }, [city]);
  
const currentCityData = wheatherData.find(item => item.city.toLowerCase() === city.toLowerCase());
const currentWeather = currentCityData?.list?.[0]?.weather?.[0]?.main || null;
console.log('Current weather:', currentWeather);


  return (
    <CityContext.Provider value={{
      selectCity,
      city,
      wheatherData,
      seeMore,
      seeMoreData,
      seeWeklyData,
      showWeeklyData,
      selectedCityForWeekly,
      selectCityForWeekly,
      seeHourlyWeather,
      hourlyDataForDay,
      removeCity,
      currentWeather,
    }}>
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </CityContext.Provider>
  );
};
export { CityContext };