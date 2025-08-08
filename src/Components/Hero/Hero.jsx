import React, { useEffect } from 'react';
import { useState } from "react"
import { useContext } from "react";

import { CityContext } from '../../Context/cityContext';

import styles from './Hero.module.scss'

import mainImage from '../../images/Hero/mainImage.png'
import sunny from '../../images/Hero/sunny.mp4'
import snowy from '../../images/Hero/snowy.mp4'
import cloudy from '../../images/Hero/cloudy.mp4'
import rainy from '../../images/Hero/rainy.mp4'
import windy from '../../images/Hero/windy.mp4'
import thunderstorm from '../../images/Hero/thunderstorm.mp4'

export function Hero() {

  const [cityName, setCityName] = useState('')

  const sendSearchedCity = (e) => {
    e.preventDefault()
    selectCity(cityName)
    e.target.children.CityInp.value = ''
  }

  const { selectCity, currentWeather } = useContext(CityContext)
  useEffect(() => {
    if (currentWeather === undefined) return
  }, [currentWeather])

  // background

  const weatherMap = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Drizzle: rainy,
    Snow: snowy,
    Thunderstorm: thunderstorm,
    Mist: windy,
    Fog: windy,
    Smoke: windy,
    Haze: windy,
    Dust: windy,
    Ash: windy,
    Squall: windy,
    Tornado: windy
  };

  const weatherKey = currentWeather?.weather?.[0]?.main;
  const weatherVideo = weatherMap[weatherKey] || cloudy;

  // date

  const date = new Date();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const monthName = months[date.getMonth()];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const year = date.getFullYear();

  function getOrdinalSuffix(n) {
    if (n >= 11 && n <= 13) return n + 'th';
    switch (n % 10) {
      case 1: return n + 'st';
      case 2: return n + 'nd';
      case 3: return n + 'rd';
      default: return n + 'th';
    }
  }

  const fullDate = `${monthName} ${year}\n${dayName}, ${getOrdinalSuffix(day)}`;

if (!currentWeather) {
  return (
    <section className={styles.hero}>
      <img className={styles.hero__backgroundImage} src={mainImage} alt="" style={{ zIndex: -1 }} />

    <h1 className={styles.hero__title}>Weather dashboard</h1>
    <div className={styles.hero__box}>
      <p className={styles.hero__text}>
        Create your personal list of favorite cities and always be aware of the weather.
      </p>
      <div className={styles.hero__line}></div>
      <p className={styles.hero__text}>{fullDate}</p>
    </div>

    <form className={styles.hero__form} onSubmit={sendSearchedCity}>
      <input
        name="CityInp"
        className={styles.hero__input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search location..."
        onChange={(e) => setCityName(e.target.value)}
      />
      <button type="submit" className={styles.hero__button}>
        <span className={styles.hero__buttonLabel}>
          <svg className={styles.hero__svgSearch}
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="#000000b4"
              strokeWidth="2"
            />
            <line
              x1="16.6569"
              y1="16.6569"
              x2="21"
              y2="21"
              stroke="#000000b4"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
    </form>
  </section>
  )
}



  return <section className={styles.hero}>
    <video key={weatherKey} autoPlay muted loop playsInline className={styles.hero__backgroundVideo} style={{ zIndex: -1 }}>
      <source src={weatherVideo} type="video/mp4" />
    </video>

    <h1 className={styles.hero__title}>Weather dashboard</h1>
    <div className={styles.hero__box}>
      <p className={styles.hero__text}>
        Create your personal list of favorite cities and always be aware of the weather.
      </p>
      <div className={styles.hero__line}></div>
      <p className={styles.hero__text}>{fullDate}</p>
    </div>

    <form className={styles.hero__form} onSubmit={sendSearchedCity}>
      <input
        name="CityInp"
        className={styles.hero__input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search location..."
        onChange={(e) => setCityName(e.target.value)}
      />
      <button type="submit" className={styles.hero__button}>
        <span className={styles.hero__buttonLabel}>
          <svg className={styles.hero__svgSearch}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="#000000b4"
              strokeWidth="2"
            />
            <line
              x1="16.6569"
              y1="16.6569"
              x2="21"
              y2="21"
              stroke="#000000b4"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
    </form>
  </section>
};