import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import style from "./Header.module.scss";
import cont from "../Container/Container.module.scss";

export function Header() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <header className={cont.container}>
      <nav className={style.nav} data-aos="fade-down">
        <img src="./logo.png" alt="" data-aos="zoom-in" data-aos-delay="100" />
        <ul className={style.links}>
          <li className={style.linkListItem} data-aos="fade-up" data-aos-delay="200">Who we are</li>
          <li className={style.linkListItem} data-aos="fade-up" data-aos-delay="300">Contacts</li>
          <li className={style.linkListItem} data-aos="fade-up" data-aos-delay="400">Menu</li>
        </ul>
      </nav>
      <ul className={style.logInHeader}>
        <li className={style.LogInHeaderItem} data-aos="fade-left" data-aos-delay="500">
          <button type="button" className="btn btn-warning">
            Warning
          </button>
        </li>
        <li className={style.LogInHeaderItem} data-aos="fade-left" data-aos-delay="600">
          <button type="button" className="btn">
            <img src="./user.png" alt="" />
          </button>
        </li>
      </ul>
    </header>
  );
}
