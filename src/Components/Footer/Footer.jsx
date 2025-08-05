import React from "react";
import cont from "../Container/Container.module.scss";
import styles from "./Footer.module.scss";
import { FaInstagram, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { Container } from "../Container/Container";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div
        className={cont.container}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <img src="./logo.png" alt="" />
        <ul className={styles.footerItemList}>
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

        <ul className={styles.footerItemList}>
          <li className={styles.footerItemListItem}>
            <h6>Contact us</h6>
          </li>
          <li className={styles.footerItemListItem}>
            <ul>
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaSquareFacebook />
              </li>
              <li>
                <FaWhatsappSquare />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}
