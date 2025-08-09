import { useContext } from "react";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { CityContext } from '../../../../Context/cityContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import cont from "../../../Container/Container.module.scss";
import style from './HourlyWeather.module.scss'

export function HourlyWeather() {
    const { hourlyDataForDay } = useContext(CityContext);

    if (!hourlyDataForDay || hourlyDataForDay.length === 0) return null;

    console.log(hourlyDataForDay)

    const data = {
        labels: hourlyDataForDay.map(item =>
            new Date(item.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ),
        datasets: [
            {
                label: "Температура (°C)",
                data: hourlyDataForDay.map(item => item.main.temp),
                borderColor: "orange",
                backgroundColor: "rgba(255,165,0,0.2)",
                tension: 0.3
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 6
                }
            },
            y: {
                ticks: {
                    callback: (value) => `${value}°C`
                }
            }
        }
    };


    return <section className={style.hourlyWeather}>
        <div className={cont.container}>
            <div className={style.hourlyWeather__bc}  data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-anchor-placement="top-bottom">
                <p className={style.hourlyWeather__text}>Hourly forecast</p>
                <div style={{ width: "100%", height: "100%" }}>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    </section>
}