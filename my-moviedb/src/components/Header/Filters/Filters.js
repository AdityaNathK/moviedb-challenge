import React from "react";
import YearRangeSlider from "./Slider/Slider";
import TypeFilter from "./RadioFilter/RadioFilter";
import "./Filters.css";
const Filters = ({ radio, setRadio, range, setRange }) => {
  return (
    <div className="filters-container">
      <YearRangeSlider range={range} setRange={setRange} />
      <TypeFilter radio={radio} setRadio={setRadio} />
    </div>
  );
};

export default Filters;
