import { createContext, useState, useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CityContext = createContext(null);

export const CityProvider = ({ children }) => {
  const [selectedCityForWeekly, setSelectedCityForWeekly] = useState(null);
  const [showWeeklyData, setShowWeeklyData] = useState(false)
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);

  const [wheatherData, setWheatherData] = useState([])
  const [seeMoreData, setseeMoreData] = useState([])
  const [hourlyDataForDay, setHourlyDataForDay] = useState([]);

  const removeCity = (cityName) => {
    setWheatherData(prev => {
      const updated = prev.filter(item => item.city.toLowerCase() !== cityName.toLowerCase());
      console.log(updated);
      return updated;
    });
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
          toast.error("City not found. Check the name.");
          return;
        }

        setWheatherData(prev => {
          const filtered = prev.filter(item => item.city.toLowerCase() !== data.city.name.toLowerCase());
          console.log([{ city: data.city.name, list: data.list }, ...filtered])
          return [{ city: data.city.name, list: data.list }, ...filtered];
        });


      } catch (error) {
        console.error("Error when requesting weather:", error);
        toast.error("An error occurred while retrieving data.");
      }
    };

    fetchWeather();
  }, [city]);

useEffect(() => {
  const savedWeatherData = localStorage.getItem('weatherData');
  if (savedWeatherData) {
    try {
      const parsed = JSON.parse(savedWeatherData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setWheatherData(parsed);
      }
    } catch (e) {
      console.error("Помилка читання localStorage", e);
    }
  }
}, []);


useEffect(() => {
  // Не перезаписуємо порожнім масивом після оновлення сторінки
  if (wheatherData.length > 0) {
    localStorage.setItem('weatherData', JSON.stringify(wheatherData));
  }
}, [wheatherData]);


  useEffect(() => {
    if (!city || !wheatherData.length) {
      setCurrentWeather(null);
      return;
    }

    const currentCityData = wheatherData.find(item => item.city.toLowerCase() === city.toLowerCase());
    setCurrentWeather(currentCityData?.list?.[0]?.weather?.[0]?.main || null);
  }, [city, wheatherData]);

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
      setShowWeeklyData,
      setHourlyDataForDay,
      setseeMoreData
    }}>
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </CityContext.Provider>
  );
};
export { CityContext };