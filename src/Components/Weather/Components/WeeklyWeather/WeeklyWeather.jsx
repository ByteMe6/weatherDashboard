import { useContext } from "react";
import { CityContext } from '../../../../Context/cityContext';

import style from './WeeklyWeather.module.scss'
import cont from "../../../Container/Container.module.scss";

import sunny from '../../../../images/Weather/weatherIcons/sunny.svg'
import moon from '../../../../images/Weather/weatherIcons/moon.png'
import fewСloudsSun from '../../../../images/Weather/weatherIcons/fewСloudsSun.svg'
import fewСloudsMoon from '../../../../images/Weather/weatherIcons/fewСloudsMoon.png'
import scatteredClouds from '../../../../images/Weather/weatherIcons/scatteredClouds.svg'
import overcastClouds from '../../../../images/Weather/weatherIcons/overcastClouds.svg'
import lightRainSun from '../../../../images/Weather/weatherIcons/lightRainSun.svg'
import lightRainMoon from '../../../../images/Weather/weatherIcons/lightRainMoon.png'
import rain from '../../../../images/Weather/weatherIcons/rain.png'
import thunderstorm from '../../../../images/Weather/weatherIcons/thunderstorm.png'
import snowy from '../../../../images/Weather/weatherIcons/snowy.png'
import mist from '../../../../images/Weather/weatherIcons/mist.svg'

export function WeeklyWeather() {
    const { showWeeklyData, wheatherData, selectedCityForWeekly } = useContext(CityContext);

    if (!showWeeklyData || !selectedCityForWeekly) return null;

    const cityWeather = wheatherData.find(item => item.city.toLowerCase() === selectedCityForWeekly.toLowerCase());

    if (!cityWeather?.list) return null;

    const customIcons = {
        "01d": sunny,
        "01n": moon,
        "02d": fewСloudsSun,
        "02n": fewСloudsMoon,
        "03d": scatteredClouds,
        "03n": scatteredClouds,
        "04d":overcastClouds,
        "04n": overcastClouds,
        "09d": lightRainSun,
        "09n": lightRainMoon,
        "10d": rain,
        "10n": rain,
        "11d": thunderstorm,
        "11n": thunderstorm,
        "13d": snowy,
        "13n": snowy,
        "50d": mist,
        "50n": mist,
    };


    const days = cityWeather.list.filter(obj => obj.dt_txt.includes('15:00:00'));

    return <section className={style.weeklyWeather}>
        <div className={cont.container}>
            <div className={style.weeklyWeather__background} data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-anchor-placement="top-bottom">
                <h6 className={style.weeklyWeather__title}>5-day forecast</h6>
                <ul className={style.weeklyWeather__list}>
                    {days.map((day, indx) => {
                        const date = new Date(day.dt_txt);
                        const months = [
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                        ];
                        const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пʼятниця', 'Субота'];

                        const dayName = daysOfWeek[date.getDay()].slice(0, 3);
                        const monthName = months[date.getMonth()].slice(0, 3);
                        const dayNumber = date.getDate();

                        const iconCodeFull = day.weather[0].icon;
                        const iconSrc = customIcons[iconCodeFull];

                        return (
                            <li className={style.weeklyWeather__item} key={indx} data-aos="fade-up"
                                data-aos-duration='1300'
                                data-aos-anchor-placement="top-bottom">
                                <p className={style.weeklyWeather__date}>{dayName}, {monthName} {dayNumber}</p>
                                <div className={style.weeklyWeather__iconTemp}>
                                    <img
                                        className={style.weeklyWeather__icon}
                                        src={iconSrc}
                                        alt={day.weather[0].description}
                                    />
                                    <p className={style.weeklyWeather__temp}>
                                        {Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°
                                    </p>
                                </div>
                                <p className={style.weeklyWeather__weather}>{day.weather[0].description}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    </section>
}