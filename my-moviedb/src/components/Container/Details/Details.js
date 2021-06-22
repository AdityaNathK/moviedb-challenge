import React from "react";
import { BookmarkIcon } from "@heroicons/react/outline";
import Rating from "./Ratings/Ratings";
import "./Details.css";
import { unavailable } from "../../../utils/config";

const Details = ({ details, handleWatchList }) => {
  return details ? (
    <div className="details">
      <div className="item-info">
        <img
          src={details.Poster === "N/A" ? unavailable : details.Poster}
          alt="poster"
          className="poster"
        />
        <div className="item-details">
          <button
            className="watchlist "
            onClick={() => handleWatchList(details)}
          >
            {/* {console.log("Bookmark clicked")} */}
            <BookmarkIcon className="icon" />
            Watchlist
          </button>
          <div className="item-title">{details.Title}</div>
          <div className="item-full-details">
            <span className="movie-cert">{details.Rated}</span>
            {details.Year} {details.Genre} {details.Runtime}
          </div>
          <div className="item-actors">{details.Actors}</div>
        </div>
      </div>
      <div className="item-description">{details.Plot}</div>
      <div className="item-ratings">
        {details.Ratings.map((rating, index) => {
          return <Rating rating={rating} key={index} />;
        })}
      </div>
    </div>
  ) : null;
};

export default Details;
