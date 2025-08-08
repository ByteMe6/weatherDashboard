import React, { useState } from "react";
import "./Slider.scss";

import { Container } from "../Container/Container";
import img1 from "../../images/Slider/Rectangle10.png";
import img2 from "../../images/Slider/Rectangle11.png";
import img3 from "../../images/Slider/Rectangle12.png";
import img4 from "../../images/Slider/Rectangle13.png";
import img5 from "../../images/Slider/Rectangle14.png";

export const Slider = () => {
  const images = [img1, img2, img3, img4, img5];
  const [currentIndex, setCurrentIndex] = useState(2);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const getImageClass = (index) => {
    const total = images.length;
    const diff = (index - currentIndex + total) % total;

    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === 2) return "right2";
    if (diff === total - 1) return "left";
    if (diff === total - 2) return "left2";
    return "hidden";
  };

  return (
    <Container>
      <div className="slider-container">
        <h1 className="titstyl">Beautiful nature</h1>
        <div className="slider">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slider-image ${getImageClass(index)}`}
              onClick={() => handleImageClick(index)}
            >
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
