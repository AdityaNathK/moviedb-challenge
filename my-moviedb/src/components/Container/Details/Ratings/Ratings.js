import React from "react";
import "./Ratings.css";
const Rating = ({ rating }) => {
  return (
    <div className="rating">
      <label className="rating-value">{rating.Value}</label>
      <label className="source">{rating.Source}</label>
    </div>
  );
};

export default Rating;
