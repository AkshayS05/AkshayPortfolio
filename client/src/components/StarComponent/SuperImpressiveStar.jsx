import React, { useState } from "react";
import StarRating3D from "./StarRating3D";
import "./StarRatingPopup.css";

const StarRatingPopup = ({ onClose }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2 className="rating-title">⭐ Rate My Work ⭐</h2>

        <div className="star-canvas-container">
          {/* The new simpler star rating */}
          <StarRating3D rating={rating} setRating={setRating} />
        </div>

        {/* Show the numeric rating just for clarity */}
        <p style={{ color: "#fff", marginTop: 10 }}>
          You selected {rating} star(s)
        </p>

        {/* Additional UI: input, submit, etc. */}
      </div>
    </div>
  );
};

export default StarRatingPopup;
