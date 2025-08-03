import React, { useState } from "react";
import "./News.scss";
import newsData from "./baza.json";

export const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const loadMoreNews = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + itemsPerPage, newsData.length - itemsPerPage)
    );
  };

  const goBack = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const currentNews = newsData.slice(currentIndex, currentIndex + itemsPerPage);

  const getImageUrl = (imageName) => {
    if (imageName.startsWith("http")) {
      return imageName;
    }
    try {
      return new URL(`../../images/News/${imageName}`, import.meta.url).href;
    } catch (e) {
      console.error("Ошибка загрузки изображения:", e);
      return "";
    }
  };

  return (
    <div className="news-container">
      <h2>Interacting with our pets</h2>

      <div className="news-grid">
        {currentNews.map((newsItem) => (
          <div className="news-card" key={newsItem.id}>
            <img
              src={getImageUrl(newsItem.image)}
              alt={newsItem.title}
              onError={(e) => (e.target.style.display = "none")}
            />
            <h3>{newsItem.title}</h3>
          </div>
        ))}
      </div>

      <div className="news-navigation">
        {currentIndex + itemsPerPage < newsData.length && (
          <button className="nav-button" onClick={loadMoreNews}>
            See more
          </button>
        )}
        {currentIndex > 0 && (
          <button className="nav-button" onClick={goBack}>
            Back
          </button>
        )}
      </div>
    </div>
  );
};
