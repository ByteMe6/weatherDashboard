import React from 'react';

import { WheatherList } from './Components/WheatherList/WheatherList';
import { MoreInfo } from './Components/MoreInfo/MoreInfo';
import { WeeklyWeather } from './Components/WeeklyWeather/WeeklyWeather';

export function Weather() {


  return (
    <>
      <WheatherList />
      <MoreInfo/>
      <WeeklyWeather/>
    </>
  );
};