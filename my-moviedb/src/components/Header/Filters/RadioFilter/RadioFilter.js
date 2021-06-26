import React from "react";
import "./RadioFilter.css";

const TypeFilter = ({ radio, setRadio, setPage }) => {
  return (
    <div className="type-filter">
      <label>TYPE</label>
      <div className="radio-btns">
        <input
          type="radio"
          id="any"
          name="type"
          checked={radio === "any"}
          value="any"
          onChange={(e) => {
            setPage(1);
            setRadio(e.target.value);
          }}
        />
        <label htmlFor="any">Any</label>
        <input
          type="radio"
          id="movie"
          name="type"
          checked={radio === "movie"}
          value="movie"
          onChange={(e) => {
            setPage(1);
            setRadio(e.target.value);
          }}
        />
        <label htmlFor="movie">Movies</label>
        <input
          type="radio"
          id="series"
          name="type"
          checked={radio === "series"}
          value="series"
          onChange={(e) => {
            setPage(1);
            setRadio(e.target.value);
          }}
        />
        <label htmlFor="series">Series</label>
        <input
          type="radio"
          id="episode"
          name="type"
          checked={radio === "episode"}
          value="episode"
          onChange={(e) => {
            setPage(1);
            setRadio(e.target.value);
          }}
        />
        <label htmlFor="episode">Episodes</label>
      </div>
    </div>
  );
};

export default TypeFilter;
