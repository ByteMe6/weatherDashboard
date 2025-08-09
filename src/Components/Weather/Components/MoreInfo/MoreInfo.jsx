import { useContext } from "react";
import { CityContext } from '../../../../Context/cityContext';

import style from './MoreInfo.module.scss';
import cont from "../../../Container/Container.module.scss";

import temp from '../../../../images/Weather/temp.png';
import pressure from '../../../../images/Weather/pressure.png';
import rain from '../../../../images/Weather/rain.png';
import visibility from '../../../../images/Weather/visibility.png';
import wind from '../../../../images/Weather/wind.png';

export function MoreInfo() {
    const { seeMoreData } = useContext(CityContext);

    if (!seeMoreData || seeMoreData.length === 0) return null;

    function formatVisibility(meters) {
        if (meters >= 10000) return 'Unlimited';
        if (meters >= 5001) return `${meters} m (Good)`;
        if (meters >= 2001) return `${meters} m (Moderate)`;
        if (meters >= 501) return `${meters} m (Poor)`;
        if (meters >= 1) return `${meters} m (Very poor)`;
        return 'No visibility';
    }

    const data = seeMoreData[0]

    return (
        <section className={style.moreInfo}>
            <div className={cont.container}>
                <div className={style.moreInfo__background} data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-anchor-placement="top-bottom">
                    <ul className={style.moreInfo__list}>
                        <li className={style.moreInfo__item}>
                            <p className={style.moreInfo__smallText}>feels like</p>
                            <p className={style.moreInfo__bigText}>{data.main.feels_like}</p>
                            <img src={temp} alt="" />
                        </li>
                        <li className={style.moreInfo__item}>
                            <p className={style.moreInfo__smallText}>Min ℃ </p>
                            <p className={style.moreInfo__minTempText}>{data.main.temp_min}℃</p>
                            <p className={style.moreInfo__smallText}>Max ℃ </p>
                            <p className={style.moreInfo__maxTempText}>{data.main.temp_max}℃</p>
                        </li>
                        <li className={style.moreInfo__item}>
                            <p className={style.moreInfo__smallText}>Humidity </p>
                            <p className={style.moreInfo__bigText}>{data.main.humidity}%</p>
                            <img src={rain} alt="" />
                        </li>
                        <li className={style.moreInfo__item}>
                            <p className={style.moreInfo__smallText}>Pressure <span>{data.main.pressure}</span></p>
                            <p className={style.moreInfo__bigText}>{data.main.pressure} Pa</p>
                            <img src={pressure} alt="" />
                        </li>
                        <li className={style.moreInfo__item}>
                            <p className={style.moreInfo__smallText}>Wind speed </p>
                            <p className={style.moreInfo__bigText}>{data.wind.speed} m/s</p>
                            <img src={wind} alt="" />
                        </li>
                        <li className={style.moreInfo__item}>
                            <p className={style.moreInfo__smallText}>Visibility</p>
                            <p className={style.moreInfo__bigText}>
                                {formatVisibility(data.visibility)}
                            </p>
                            <img src={visibility} alt="" />
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
