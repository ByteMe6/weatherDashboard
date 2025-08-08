import { createContext, useState, useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CityContext = createContext(null);

export const CityProvider = ({ children }) => {
  const [showWeeklyData, setShowWeeklyData] = useState(false)
  const [city, setCity] = useState('');

  const [wheatherData, setWheatherData] = useState(null)
  const [seeMoreData, setseeMoreData] = useState([])
  const [hourlyDataForDay, setHourlyDataForDay] = useState([]);

  const seeMore = (day) => {
    if (!wheatherData) return;

    const dataForDay = wheatherData.list.filter(item => item.dt_txt.startsWith(day));
    setseeMoreData(dataForDay);
  };

const seeHourlyWeather = (dateTime) => {
  if (!wheatherData) return;

  const startTime = new Date(dateTime).getTime();
  const endTime = startTime + 24 * 60 * 60 * 1000;

  const next24Hours = wheatherData.list.filter(item => {
    const itemTime = new Date(item.dt_txt).getTime();
    return itemTime >= startTime && itemTime <= endTime;
  });

  setHourlyDataForDay(next24Hours);
};

  const seeWeklyData = () => {
    if (showWeeklyData) return;
    setShowWeeklyData(true)
  }

  useEffect(() => {
    setseeMoreData([])
  }, [city])

  const selectCity = (cityName) => {
    setCity(cityName)
  };


const deleteDay = (date) => {
  setWheatherData(prev => {
    if (!prev) return prev;
    return {
      ...prev,
      list: prev.list.filter(obj => obj.dt_txt !== date)
    };
  });
};

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b6bbc0579c03f40c19f334807788b408&units=metric&lang=en`);
        const data = await res.json();

        if (data.cod !== "200") {
          toast.error("Місто не знайдено. Перевірте назву.");
          setWheatherData(null);
          return;
        }

        setWheatherData(data);

      } catch (error) {
        console.error("Помилка при запиті погоди:", error);
        toast.error("Сталася помилка при отриманні даних.");
        setWheatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  const currentWeather = wheatherData?.list?.[0]

  return (
    <CityContext.Provider value={{
      selectCity,
      city,
      wheatherData,
      seeMore,
      seeMoreData,
      currentWeather,
      seeWeklyData,
      showWeeklyData,
      seeHourlyWeather,
      hourlyDataForDay,
      deleteDay
    }}>
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </CityContext.Provider>
  );
};
export { CityContext };