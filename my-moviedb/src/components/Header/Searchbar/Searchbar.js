import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import "./Searchbar.css";

const Searchbar = ({ searchVar, setSearchVar }) => {
  const [typingTimeOut, setTypingTimeOut] = useState("");

  return (
    <div className="search-bar">
      <SearchIcon className="icon" />
      <input
        type="text"
        name="search"
        placeholder="search movies here"
        // value={searchVar}
        onChange={(event) => {
          const textInput = event.target.value;
          clearTimeout(typingTimeOut);
          const timeOut = setTimeout(() => {
            setSearchVar(textInput);
          }, 500);
          setTypingTimeOut(timeOut);
        }}
      />
    </div>
  );
};

export default Searchbar;
