import React from "react";
import { unavailable } from "../../utils/config";
import { XIcon } from "@heroicons/react/outline";
import "./WatchList.css";

const ListMovie = ({ listItem, handleWatchList, key }) => {
  return (
    <div className="watch-list">
      <img
        src={listItem.Poster === "N/A" ? unavailable : listItem.Poster}
        alt="poster"
        className="list-image"
      />
      <div className="info-block">
        <div className="title">{listItem.Title} -</div>
        <div className="title">{listItem.Year}</div>
      </div>
      <button className="cross-btn" onClick={() => handleWatchList(listItem)}>
        <XIcon className="icon" />
      </button>
    </div>
  );
};

export default ListMovie;
