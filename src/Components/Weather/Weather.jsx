import React from 'react';

import { WheatherList } from './Components/WheatherList/WheatherList';
import { MoreInfo } from './Components/MoreInfo/MoreInfo';
import { WeeklyWeather } from './Components/WeeklyWeather/WeeklyWeather';
import { HourlyWeather } from './Components/HourlyWeather/HourlyWeather';

export function Weather({ isLogin, favoriteWeather, toggleFavorite, removeFromFavorite }) {


  return (
    <>
      <WheatherList isLogin={isLogin}
        favoriteWeather={favoriteWeather}
        toggleFavorite={toggleFavorite}
        removeFromFavorite={removeFromFavorite}
      />
      <MoreInfo />
      <HourlyWeather />
      <WeeklyWeather />
    </>
  );
};