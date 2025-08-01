import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import style from "./Header.module.scss";
import cont from "../Container/Container.module.scss";

export function Header({ user, login, onLogin, onLogout }) {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  return (
    <header className={cont.container}>
      <nav className={style.nav} data-aos="fade-down">
        <img src="./logo.png" alt="" data-aos="zoom-in" data-aos-delay="100" />
        <ul className={style.links}>
          <li
            className={style.linkListItem}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Who we are
          </li>
          <li
            className={style.linkListItem}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Contacts
          </li>
          <li
            className={style.linkListItem}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Menu
          </li>
        </ul>
      </nav>
      <ul className={style.logInHeader}>
        {!login ? (
          <li
            className={style.LogInHeaderItem}
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <button type="button" className="btn btn-warning" onClick={onLogin}>
              Sign In with Google
            </button>
          </li>
        ) : (
          <>
            <li
              className={style.LogInHeaderItem}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <button
                type="button"
                className="btn btn-warning me-2"
                onClick={onLogout}
              >
                Logout
              </button>
            </li>
            <li
              className={style.LogInHeaderItem}
              data-aos="fade-left"
              data-aos-delay="700"
            >
              <button type="button" className="btn">
                <img
                  src="./user.png"
                  alt="User Avatar"
                  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                />
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
