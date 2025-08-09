import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./Fav.module.scss";

function renderTemperature(item) {
  const tempValue = item.main?.temp;
  if (typeof tempValue === "number" && !isNaN(tempValue)) {
    return `${Math.round(tempValue)}°C`;
  }
  return "—";
}

function renderTime(item) {
  let date;
  if (item.dt_txt) {
    date = new Date(item.dt_txt);
  } else if (item.dt) {
    date = new Date(item.dt * 1000);
  }
  if (date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  return "";
}

export function Fav({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [localItems, setLocalItems] = useState(items);

  // Обновляем локальные данные при изменении props.items
  React.useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const hasFavorites = Array.isArray(localItems) && localItems.length > 0;

  return (
    <div>
      <button
        className={styles.favHeartBtn}
        onClick={() => setOpen(true)}
        title="Show favorites"
        aria-label="Show favorites"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "2rem",
          color: hasFavorites ? "#e53935" : "#aaa",
          padding: 0,
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
        }}
      >
        {hasFavorites ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>

      {open &&
        ReactDOM.createPortal(
          <div
            className={styles.favModalOverlay}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Favorite cities modal"
          >
            <div
              className={styles.favModal}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.favModalClose}
                onClick={() => setOpen(false)}
                aria-label="Close favorites modal"
              >
                ×
              </button>

              {hasFavorites ? (
                <div className={styles.favModalScroll}>
                  {localItems.map((item, idx) => (
                    <div key={item.city + idx} className={styles.favItem}>
                      {/* Кнопка удаления убрана */}
                      <div className={styles.city}>{item.city}</div>
                      <div className={styles.date}>
                        {item.dt_txt
                          ? new Date(item.dt_txt).toLocaleDateString("en-US", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })
                          : item.dt
                          ? new Date(item.dt * 1000).toLocaleDateString("en-US", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                            })
                          : ""}
                        <br />
                        {(item.dt_txt || item.dt) && (
                          <span className={styles.time}>{renderTime(item)}</span>
                        )}
                      </div>
                      <div className={styles.temp}>{renderTemperature(item)}</div>
                      {item.weather && item.weather[0] && (
                        <div className={styles.weather}>
                          <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                            className={styles.weatherIcon}
                          />
                          <span className={styles.weatherDesc}>
                            {item.weather[0].description}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  No favorite cities
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Fav;