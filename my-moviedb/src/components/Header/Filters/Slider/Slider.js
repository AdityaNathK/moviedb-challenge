import React from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import "./Slider.css";

function valuetext(value) {
  return `${value}°C`;
}
const PrettoSlider = withStyles({
  root: {
    color: "#e3e3e3",
    height: 8,
    padding: "4px 0px",
    margin: "0px 12px",
  },
  thumb: {
    height: 10,
    width: 10,
    backgroundColor: "#ffffff",
    border: "2px solid #ffffff",
    marginTop: -2,
    marginLeft: -3,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  track: {
    height: 4,
    borderRadius: 0,
    backgroundColor: "#ffffff",
  },
  rail: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
  },
  valueLabel: {
    left: "-50%",
    top: -18,
    "& *": {
      background: "transparent",
      color: "transparent",
    },
  },
})(Slider);
const YearRangeSlider = ({ range, setRange }) => {
  const handleChange = (event, newValue) => {
    setRange(newValue);
  };
  return (
    <div className="slider">
      <label>YEAR</label>
      <div className="slider-contianer">
        <label>{range[0]}</label>
        <PrettoSlider
          value={range}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
          min={1970}
          max={2015}
        />
        <label>{range[1]}</label>
      </div>
    </div>
  );
};

export default YearRangeSlider;
