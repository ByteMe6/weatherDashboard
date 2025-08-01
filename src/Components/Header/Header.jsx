import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import style from "./Header.module.scss";
import cont from "../Container/Container.module.scss";

export function Header({ user, login, onLogin, onLogout }) {
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const handleOpenUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

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
              Log in with Google
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
                Log out
              </button>
            </li>
            <li
              className={style.LogInHeaderItem}
              data-aos="fade-left"
              data-aos-delay="700"
            >
              <button type="button" className="btn" onClick={handleOpenUserModal}>
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
        {/* modal */}
      {showUserModal && (
        <div
          className="modal show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
          }}
          tabIndex="-1"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: 400, margin: "auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User info</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseUserModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                {/* <img
                  src={user && user.photoURL ? user.photoURL : "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/user.png"}
                  alt="User Avatar"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                /> */}
                <div>
                  <strong>Name:</strong>{" "}
                  {user && user.displayName ? user.displayName : "No info"}
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  {user && user.email ? user.email : "No info"}
                </div>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseUserModal}
                >
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
