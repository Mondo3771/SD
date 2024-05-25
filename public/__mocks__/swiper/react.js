// public/__mocks__/swiper/react.js
import React from "react";
module.exports = {
  Swiper: ({ onSlideChange, ...props }) => {
    const cards = [1, 2, 3, 4, 5]; // replace with your actual data

    return (
      <div>
        {cards.map((card, index) => (
          <div
            aria-label={`Card ${index}`}
            key={index}
            onClick={() => onSlideChange({ realIndex: index })}
            style={{
              display: "inline-block",
              width: "100px",
              height: "100px",
              margin: "10px",
              backgroundColor: "lightgray",
              cursor: "pointer",
            }}
          >
            Card {card}
          </div>
        ))}
      </div>
    );
  },
  SwiperSlide: ({ children, ...props }) => (
    <div {...props} mockName="SwiperSlide">
      {children}
    </div>
  ),
};
