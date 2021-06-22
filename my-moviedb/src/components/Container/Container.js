import React, { useState, useEffect } from "react";
import "./Container.css";
import ListItem from "./ListItem/ListItem";
import Details from "./Details/Details";
import axios from "axios";
import WatchList from "../WatchList/WatchList";

const Container = ({
  movie,
  totalResults,
  handleWatchList,
  watchList,
  removeWatchList,
  pageIncrement,
}) => {
  const [selected, setSelected] = useState(0);
  const [itemDetails, setItemDetails] = useState(0);

  useEffect(() => {
    let seletectItem = movie[selected];
    if (!seletectItem) return;
    axios
      .get(
        `${process.env.REACT_APP_OMDB_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${seletectItem.imdbID}`
      )
      .then((res) => {
        setItemDetails(res.data);
      });
  }, [selected, movie]);

  return (
    <>
      <div className="container">
        <div className="movie-list">
          <div className="lable-container">
            <label className="lable-text">{totalResults} RESULTS</label>
          </div>
          {movie.map((movie, index) => {
            return (
              <div
                onClick={() => {
                  setSelected(index);
                }}
                key={index}
              >
                <ListItem listItem={movie} isActive={index === selected} />
              </div>
            );
          })}
          <div className="load-button">
            <button onClick={() => pageIncrement()}>Load more</button>
          </div>
        </div>
        <div className="movie-details">
          <Details
            details={itemDetails}
            watchList={watchList}
            handleWatchList={handleWatchList}
          />
        </div>
      </div>
      <WatchList watchList={watchList} removeWatchList={removeWatchList} />
    </>
  );
};
export default Container;
