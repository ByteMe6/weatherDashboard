import React, { useContext, useState, useEffect } from "react";
import { CityContext } from '../../../../Context/cityContext';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";

import style from './WheatherList.module.scss';
import cont from "../../../Container/Container.module.scss";

export function WheatherList({ isLogin, favoriteWeather, toggleFavorite, removeFromFavorite, }) {
    const { wheatherData,
        seeMore,
        seeHourlyWeather,
        selectCityForWeekly,
        removeCity } = useContext(CityContext);

    const [localDays, setLocalDays] = useState([]);
    const [wasDataOnce, setWasDataOnce] = useState(false);

    useEffect(() => {
        if (wheatherData.length) {
            const now = new Date();

            const updatedLocalDays = wheatherData.map(cityData => {
                const closestForecast = cityData.list.reduce((closest, current) => {
                    const currentTime = new Date(current.dt_txt);
                    const closestTime = new Date(closest.dt_txt);

                    return Math.abs(currentTime - now) < Math.abs(closestTime - now)
                        ? current
                        : closest;
                }, cityData.list[0]);

                return { city: cityData.city, days: [closestForecast] };
            });

            setLocalDays(updatedLocalDays);
        }
    }, [wheatherData]);

    useEffect(() => {
        if (wheatherData.length > 0 && !wasDataOnce) {
            setWasDataOnce(true);
        }
    }, [wheatherData, wasDataOnce]);

    if (wheatherData.length === 0) {
        if (wasDataOnce) {
            return (
                <section className={style.wheatherList}>
                    <div className={cont.container}>
                        <div className={style.wheatherList__empty}>
                            <p className={style.wheatherList__emptyText}>There are no cities listed</p>
                        </div>
                    </div>
                </section>
            );
        } else {
            return null;
        }
    }

    if (!localDays.length) return null;

    const notifyLoginRequired = () => toast.warn("Please log in to use this feature.");

    const handleSeeHourlyWeather = (cityName, date) => {
        if (!isLogin) {
            notifyLoginRequired();
            return;
        }
        seeHourlyWeather(cityName, date);
    };

    const handleSeeWeeklyWeather = (cityData) => {
        if (!isLogin) {
            notifyLoginRequired();
            return;
        }
        selectCityForWeekly(cityData)
    }

    const handleSeeMore = (cityName, date) => {
        if (!isLogin) {
            notifyLoginRequired();
            return;
        }
        seeMore(cityName, date);
    };

    const handleDeleteDay = (cityName) => {
        const cityData = wheatherData.find(c => c.city === cityName);
        if (cityData) {
            cityData.list.forEach(day => removeFromFavorite(day, cityName));
        }
        removeCity(cityName);
    };

    const handleFavorite = (day, cityData) => {
        if (!isLogin) {
            notifyLoginRequired();
            return;
        }
        toggleFavorite(day, cityData)
    }

    const handleRefresh = (cityName) => {
        setLocalDays(prevLocalDays => {
            return prevLocalDays.map(cityDay => {
                if (cityDay.city !== cityName) return cityDay;

                const cityFullData = wheatherData.find(c => c.city === cityName);
                if (!cityFullData) return cityDay;

                const currentIndex = cityFullData.list.findIndex(item => item.dt === cityDay.days[0].dt);

                const nextIndex = (currentIndex + 1) % cityFullData.list.length;

                return { city: cityName, days: [cityFullData.list[nextIndex]] };
            });
        });
    };


    const isFavorite = (day, city) => favoriteWeather.some(item => item.dt === day.dt && item.city === city);

    return (
        <section className={style.wheatherList}>
            <div className={cont.container}>
                <motion.ul
                    className={style.wheatherList__list}
                    style={{ display: 'flex', overflowX: 'hidden' }}>
                    <AnimatePresence>
                        {localDays.map(cityData => (
                            cityData.days.map((day) => {
                                const date = new Date(day.dt_txt);
                                const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пʼятниця', 'Субота'];
                                const dayName = daysOfWeek[date.getDay()];
                                return (
                                    <motion.li
                                        key={cityData.city}
                                        layout
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                                        className={style.wheatherList__item}
                                    >
                                        <p className={style.wheatherList__textCity}>{cityData.city}</p>
                                        <p className={style.wheatherList__textTime}>{day.dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')}</p>

                                        <div className={style.wheatherList__buttons}>
                                            <button
                                                onClick={() => handleSeeHourlyWeather(cityData.city, day.dt_txt)}
                                                className={style.wheatherList__button}>
                                                Hourly forecast
                                            </button>
                                            <button
                                                onClick={() => handleSeeWeeklyWeather(cityData.city)}
                                                className={style.wheatherList__button}>
                                                Weekly forecast
                                            </button>
                                        </div>

                                        <div className={style.wheatherList__date}>
                                            <p className={style.wheatherList__textDate}>{day.dt_txt.split(' ')[0]}</p>
                                            <div className={style.wheatherList__line}></div>
                                            <p className={style.wheatherList__day}>{dayName}</p>
                                        </div>

                                        <img
                                            className={style.wheatherList__icon}
                                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
                                            alt={day.weather[0].description}
                                        />

                                        <p className={style.wheatherList__textTemp}>{Math.floor(day.main.temp)}°C</p>

                                        <div className={style.wheatherList__footer}>
                                            <button
                                                onClick={() => handleRefresh(cityData.city)}
                                                className={style.wheatherList__refreshBtn}
                                            >
                                                <svg className={style.wheatherList__refreshSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" id="Autorenew--Streamline-Sharp-Material" height="30" width="30">
                                                    <path fill="#000000" d="M6.125 19.65625c-0.41666875 -0.75 -0.70833125 -1.5051875000000001 -0.875 -2.265625 -0.16666875 -0.7603749999999999 -0.25 -1.5364375 -0.25 -2.328125 0 -2.729125 0.984375 -5.078125 2.953125 -7.046875C9.921875 6.0468875 12.270812499999998 5.062518750000001 15 5.062518750000001h1.34375l-2.5 -2.5000062499999998 1.21875 -1.21875 4.65625 4.65625625L15.0625 10.65625l-1.25 -1.25 2.46875 -2.46875H15c-2.2291875 0 -4.140625 0.796875 -5.734375 2.390625C7.671875 10.921875 6.875 12.833375 6.875 15.0625c0 0.6041875 0.0573125 1.177125 0.171875 1.71875 0.1145625 0.5416875 0.2551875 1.052125 0.421875 1.53125L6.125 19.65625ZM14.875 28.75l-4.65625 -4.65625 4.65625 -4.65625 1.21875 1.21875 -2.5 2.5H15c2.2291875 0 4.140625 -0.796875 5.734375 -2.390625C22.328125 19.171875 23.125 17.260437500000002 23.125 15.03125c0 -0.604125 -0.0520625 -1.1770625 -0.15625 -1.71875 -0.10418749999999999 -0.541625 -0.2604375 -1.0520625 -0.46875 -1.53125l1.34375 -1.34375c0.4166875 0.75 0.7135625 1.50525 0.890625 2.265625 0.1770625 0.7604374999999999 0.265625 1.5365000000000002 0.265625 2.328125 0 2.7291875 -0.984375 5.078125 -2.953125 7.046875 -1.96875 1.96875 -4.3176875 2.953125 -7.046875 2.953125h-1.40625l2.5 2.5L14.875 28.75Z" strokeWidth="0.625"></path>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleFavorite(day, cityData.city)}
                                                className={style.wheatherList__favoriteBtn}
                                                aria-label="Toggle favorite"
                                                type="button"
                                            >
                                                <svg
                                                    className={style.wheatherList__favoriteSvg}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill={isFavorite(day, cityData.city) ? "#e24c4cff" : "none"}
                                                    stroke="#e24c4cff"
                                                    viewBox="0 0 30 30"
                                                    height="30"
                                                    width="30"
                                                >
                                                    <path d="M15 26.2188L13.7187 25.0625c-2.2036-2.0233-4.0252-3.7688-5.465-5.2363-1.44-1.4674-2.5871-2.7794-3.4413-3.9356-0.8542-1.1562-1.4531-2.2031-1.7969-3.1406C2.6718 11.8125 2.5 10.8646 2.5 9.90625c0-1.8781 0.6302-3.4466 1.8906-4.7056 1.2604-1.2587 2.8177-1.8881 4.6719-1.8881 1.1875 0 2.2864 0.2812 3.2969 0.8437 1.0104 0.5625 1.8906 1.375 2.6406 2.4375 0.875-1.125 1.8021-1.9531 2.7813-2.4844 0.9792-0.5312 2.0312-0.7969 3.1562-0.7969 1.8542 0 3.4114 0.6294 4.6719 1.8881C26.8698 6.4596 27.5 8.0281 27.5 9.90625c0 0.9584-0.1719 1.9063-0.5156 2.8437-0.3438 0.9375-0.9427 1.9844-1.7969 3.1406-0.8542 1.1563-2.0013 2.4682-3.4413 3.9356-1.4398 1.4675-3.2614 3.2129-5.465 5.2363L15 26.2188Z" strokeWidth="2.2" fillRule="evenodd" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button onClick={() => handleSeeMore(cityData.city, day.dt_txt)} className={style.wheatherList__seeMore}>
                                                see more
                                            </button>
                                            <button onClick={() => handleDeleteDay(cityData.city)} className={style.wheatherList__deleteBtn}>
                                                <svg className={style.wheatherList__deleteSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" id="Delete--Streamline-Sharp-Material" height="30" width="30">
                                                    <path fill="#000000" d="M6.28125 26.25V6.5625H5v-1.875h5.875V3.75h8.25v0.9375H25v1.875h-1.28125V26.25h-17.4375Zm1.875 -1.875h13.6875V6.5625h-13.6875V24.375Zm3.3125 -2.6875h1.875V9.21875h-1.875V21.6875Zm5.1875 0h1.875V9.21875h-1.875V21.6875Z" strokeWidth="0.625"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </motion.li>
                                );
                            })
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
}