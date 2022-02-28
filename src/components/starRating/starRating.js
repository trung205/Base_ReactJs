import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "./starRating.css";

function StarRating(props) {
  const { getStar } = props;
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    getStar(rating);
  }, [rating]);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              className="input-star"
            />
            <FaStar
              size={20}
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <span className="user-rating">{hover || rating}</span>
    </div>
  );
}

export default StarRating;
