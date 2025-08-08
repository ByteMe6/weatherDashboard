import { useContext } from "react";
import { CityContext } from '../../../../Context/cityContext';

import style from './WeeklyWeather.module.scss'
import cont from "../../../Container/Container.module.scss";

export function WeeklyWeather() {
    const { showWeeklyData, wheatherData, selectedCityForWeekly } = useContext(CityContext);

    if (!showWeeklyData || !selectedCityForWeekly) return null;

    const cityWeather = wheatherData.find(item => item.city.toLowerCase() === selectedCityForWeekly.toLowerCase());

    if (!cityWeather?.list) return null;

    const days = cityWeather.list.filter(obj => obj.dt_txt.includes('15:00:00'));

    return <section className={style.weeklyWeather}>
        <div className={cont.container}>
            <div className={style.weeklyWeather__background}>
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

                        console.log(day)
                        return (
                            <li className={style.weeklyWeather__item} key={indx}>
                                <p className={style.weeklyWeather__date}>{dayName}, {monthName} {dayNumber}</p>
                                <div className={style.weeklyWeather__iconTemp}>
                                    <img
                                        className={style.weeklyWeather__icon}
                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
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