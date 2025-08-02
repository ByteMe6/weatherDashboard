import React from "react";
import styles from "./Footer.module.scss";
import cont from "../Container/Container.module.scss";
import { FaInstagram, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export function Footer() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <footer
      className={`${cont.container} ${styles.footer}`}
      data-aos="fade-up"
    >
      <img src="./logo.png" alt="" data-aos="zoom-in" data-aos-delay="100" />
      <ul className={styles.footerItemList} data-aos="fade-right" data-aos-delay="200">
        <li className={styles.footerItemListItem}>
          <h6>Adress</h6>
        </li>
        <li className={styles.footerItemListItem}>
          <p>
            Svobody str. 35
            <br />
            Kyiv
            <br /> Ukraine
          </p>
        </li>
      </ul>

      <ul className={styles.footerItemList} data-aos="fade-left" data-aos-delay="300">
        <li className={styles.footerItemListItem}>
          <h6>Contact us</h6>
        </li>
        <li className={styles.footerItemListItem}>
          <ul>
            <li data-aos="zoom-in" data-aos-delay="400">
              <FaInstagram />
            </li>
            <li data-aos="zoom-in" data-aos-delay="500">
              <FaSquareFacebook />
            </li>
            <li data-aos="zoom-in" data-aos-delay="600">
              <FaWhatsappSquare />
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
}
