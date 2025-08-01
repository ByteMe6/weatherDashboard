import { useContext } from "react";
import { CityContext } from '../../../../Context/cityContext';

import style from './WheatherList.module.scss';

export function WheatherList() {
    const { wheatherData, city,seeMore,seeWeklyData } = useContext(CityContext);

    if (!wheatherData) return null;

    const handleSeeMore = (date) =>{
        seeMore(date)
    }

    const days = wheatherData.list
        .filter(obj => obj.dt_txt.includes('15:00:00'))
        .slice(0, 3);

    return (
        <section className={style.wheatherList}>
            <ul className={style.wheatherList__list}>
                {days.map(day => {
                    const date = new Date(day.dt_txt);
                    const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пʼятниця', 'Субота'];
                    const dayName = daysOfWeek[date.getDay()];

                    return (
                        <li key={day.dt} className={style.wheatherList__item}>
                            <p className={style.wheatherList__textCity}>{city}</p>
                            <p className={style.wheatherList__textTime}>{day.dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')}</p>

                            <div className={style.wheatherList__buttons}>
                                <button className={style.wheatherList__button}>Hourly forecast</button>
                                <button onClick={seeWeklyData} className={style.wheatherList__button}>Weekly forecast</button>
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

                            <p className={style.wheatherList__textTemp}>{day.main.temp}°C</p>

                            <div className={style.wheatherList__footer}>
                                <button className={style.wheatherList__refreshBtn}>
                                    <svg className={style.wheatherList__refreshSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" id="Autorenew--Streamline-Sharp-Material" height="30" width="30">
                                        <path fill="#000000" d="M6.125 19.65625c-0.41666875 -0.75 -0.70833125 -1.5051875000000001 -0.875 -2.265625 -0.16666875 -0.7603749999999999 -0.25 -1.5364375 -0.25 -2.328125 0 -2.729125 0.984375 -5.078125 2.953125 -7.046875C9.921875 6.0468875 12.270812499999998 5.062518750000001 15 5.062518750000001h1.34375l-2.5 -2.5000062499999998 1.21875 -1.21875 4.65625 4.65625625L15.0625 10.65625l-1.25 -1.25 2.46875 -2.46875H15c-2.2291875 0 -4.140625 0.796875 -5.734375 2.390625C7.671875 10.921875 6.875 12.833375 6.875 15.0625c0 0.6041875 0.0573125 1.177125 0.171875 1.71875 0.1145625 0.5416875 0.2551875 1.052125 0.421875 1.53125L6.125 19.65625ZM14.875 28.75l-4.65625 -4.65625 4.65625 -4.65625 1.21875 1.21875 -2.5 2.5H15c2.2291875 0 4.140625 -0.796875 5.734375 -2.390625C22.328125 19.171875 23.125 17.260437500000002 23.125 15.03125c0 -0.604125 -0.0520625 -1.1770625 -0.15625 -1.71875 -0.10418749999999999 -0.541625 -0.2604375 -1.0520625 -0.46875 -1.53125l1.34375 -1.34375c0.4166875 0.75 0.7135625 1.50525 0.890625 2.265625 0.1770625 0.7604374999999999 0.265625 1.5365000000000002 0.265625 2.328125 0 2.7291875 -0.984375 5.078125 -2.953125 7.046875 -1.96875 1.96875 -4.3176875 2.953125 -7.046875 2.953125h-1.40625l2.5 2.5L14.875 28.75Z" strokeWidth="0.625"></path>
                                    </svg>
                                </button>
                                <button className={style.wheatherList__favoriteBtn}>
                                    <svg className={style.wheatherList__favoriteSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" id="Favorite--Streamline-Sharp-Material" height="30" width="30">
                                        <path fill="#ff0000ff" d="M15 26.2188125 13.71875 25.0625c-2.2035625 -2.0233125 -4.0251874999999995 -3.7687500000000003 -5.465 -5.23625 -1.44 -1.4674375 -2.58708125 -2.779375 -3.44125 -3.935625 -0.85416875 -1.15625 -1.453125 -2.203125 -1.796875 -3.140625C2.671875 11.8125 2.5 10.864625 2.5 9.90625c0 -1.8781249999999998 0.63020625 -3.446625 1.890625 -4.70559375 1.26041875 -1.2587499999999998 2.8176875 -1.888125 4.671875 -1.888125 1.1875 0 2.2864375 0.28125 3.296875 0.84375 1.0104375 0.5625 1.890625 1.375 2.640625 2.43746875 0.875 -1.1249687499999999 1.8020625000000001 -1.95309375 2.78125 -2.4843437500000003 0.9791875 -0.53125 2.03125 -0.796875 3.15625 -0.796875 1.8541874999999999 0 3.4114375000000003 0.6293749999999999 4.671875 1.888125C26.869812500000002 6.459625 27.5 8.028125000000001 27.5 9.90625c0 0.9583750000000001 -0.171875 1.90625 -0.515625 2.84375 -0.34375 0.9375 -0.9426875 1.984375 -1.796875 3.140625 -0.8541875 1.15625 -2.0012499999999998 2.4681875 -3.44125 3.935625 -1.4398125 1.4674999999999998 -3.2614375 3.2129375 -5.465 5.23625L15 26.2188125ZM15 23.75c2.1091875 -1.9375 3.8448124999999997 -3.5989375 5.206875 -4.984375 1.3620625 -1.385375 2.4441875 -2.5989375 3.24625 -3.640625 0.8020625000000001 -1.041625 1.3645625 -1.9701875 1.6875 -2.785625 0.32293750000000004 -0.8151875 0.484375 -1.6247500000000001 0.484375 -2.42875 0 -1.377875 -0.4375 -2.5095625 -1.3125 -3.3950000000000005 -0.875 -0.8853875 -1.9976875 -1.32809375 -3.368125 -1.32809375 -1.0733125000000001 0 -2.06675 0.328125 -2.9803125 0.984375C17.0505 6.828125 16.3125 7.75 15.75 8.9375h-1.53125c-0.5416875 -1.166625 -1.26925 -2.0833125 -2.1828125000000003 -2.74996875 -0.9135625 -0.66666875 -1.907 -1 -2.9803125 -1 -1.3704375 0 -2.493125 0.44270625 -3.368125 1.32809375C4.8125 7.4010625 4.375 8.534625 4.375 9.91625c0 0.8058750000000001 0.16145625 1.62025 0.484375 2.4431249999999998 0.32291875 0.8229375 0.88541875 1.7604375 1.6875 2.8125C7.3489375 16.224 8.4375 17.4375 9.8125 18.8125c1.375 1.375 3.1041875 3.020875 5.1875 4.9375Z" strokeWidth="0.625"></path>
                                    </svg>
                                </button>
                                <button onClick={()=>handleSeeMore(day.dt_txt)} className={style.wheatherList__seeMore}>see more</button>
                                <button className={style.wheatherList__deleteBtn}>
                                    <svg className={style.wheatherList__deleteSvg} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" id="Delete--Streamline-Sharp-Material" height="30" width="30">
                                        <path fill="#000000" d="M6.28125 26.25V6.5625H5v-1.875h5.875V3.75h8.25v0.9375H25v1.875h-1.28125V26.25h-17.4375Zm1.875 -1.875h13.6875V6.5625h-13.6875V24.375Zm3.3125 -2.6875h1.875V9.21875h-1.875V21.6875Zm5.1875 0h1.875V9.21875h-1.875V21.6875Z" strokeWidth="0.625"></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>

    );
}


