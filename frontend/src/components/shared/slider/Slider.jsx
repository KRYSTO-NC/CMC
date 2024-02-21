import { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import './slider.css';

const Slider = ({ product}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      <div className="slider">
        {product.images &&
          product.images.map((image, index) => (
            <div
              key={index}
              className={index === currentIndex ? 'slide active' : 'slide'}
            >
 
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        <button className="btn navigation-button prev-btn" onClick={prevSlide}>
          <FaArrowAltCircleLeft />
        </button>
        <button className="btn navigation-button next-btn" onClick={nextSlide}>
          <FaArrowAltCircleRight />
        </button>
      </div>
    </>
  );
};

export default Slider;
