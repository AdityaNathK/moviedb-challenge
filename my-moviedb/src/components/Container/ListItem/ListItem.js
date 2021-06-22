import React from "react";
import "./ListItem.css";
import { unavailable } from "../../../utils/config";

const ListItem = ({ listItem, isActive }) => {
  return (
    <div className={`list-item ${isActive && "active"}`}>
      <img
        src={listItem.Poster === "N/A" ? unavailable : listItem.Poster}
        alt="poster"
        className="list-image"
      />
      <div className="info">
        <div className="title">{listItem.Title}</div>
        <div className="year">{listItem.Year}</div>
      </div>
    </div>
  );
};

export default ListItem;
