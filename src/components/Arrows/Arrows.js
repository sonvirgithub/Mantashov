import React from "react";

import "./arrows.css";

import whiteRightArrow from "../../images/white-rightArrow-component.svg";
import whiteLeftArrow from "../../images/white-leftArrow-component.svg";

import whiteRightDisabledArrow from "../../images/disabled-rightWhite-arrow.svg";
import whiteLeftDisabledArrow from "../../images/disabled-leftWhite-arrow.svg";

import blackRightArrow from "../../images/black-rightArrow-component.svg";
import blackLeftArrow from "../../images/black-leftArrow-component.svg";

import blackRightDisabledArrow from "../../images/disabled-rightBlack-arrow.svg";
import blackLeftDisabledArrow from "../../images/disabled-leftBlack-arrow.svg";

function Arrows({
  color,
  isPrevExist,
  isNextExist,
  handleScroll = () => {},
  // move size for arrow click
  scrollSize,
}) {
  const onClickLeft = () => {
    handleScroll((prevState) => prevState - scrollSize);
  };

  const onClickRight = () => {
    handleScroll((prevState) => prevState + scrollSize);
  };

  return (
    <div className="arrows-container">
      <img
        className={`arrow-icon ${isPrevExist ? "cursor-pointer" : ""}`}
        onClick={onClickLeft}
        src={
          color === "white"
            ? isPrevExist
              ? whiteLeftArrow
              : whiteLeftDisabledArrow
            : isPrevExist
            ? blackLeftArrow
            : blackLeftDisabledArrow
        }
        alt="left arrow"
      />
      {/* <Tappable onTap={onClickRight}>Tappppppp</Tappable> */}
      <img
        className={`arrow-icon ${
          isNextExist ? "cursor-pointer" : ""
        } right-arr`}
        onClick={onClickRight}
        src={
          color === "white"
            ? isNextExist
              ? whiteRightArrow
              : whiteRightDisabledArrow
            : isNextExist
            ? blackRightArrow
            : blackRightDisabledArrow
        }
        alt="right arrow"
      />
    </div>
  );
}

export default Arrows;
