import React from "react";
import ListMovie from "./ListMovie";

import "./WatchList.css";

const WatchList = ({ watchList, removeWatchList }) => {
  return (
    <>
      <div className="watch-container">
        <h3>Watch List</h3>
        {watchList.map((watchList, index) => {
          return (
            <div key={index} className="watch-list-items">
              <ListMovie
                listItem={watchList}
                handleWatchList={removeWatchList}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WatchList;
