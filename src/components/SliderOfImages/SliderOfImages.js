import React from "react";
import { connect } from "react-redux";
// import {} from "../../../store";
import "./SliderOfImages.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderOfImages = ({ img = [], carouselClassName }) => {
  // const images = [
  //   { url: "./images/teacher4.jpg" },
  //   { url: "./images/teacher2.jpg" },
  //   { url: "./images/teacher3.jpg" },
  // ];
  return (
    <>
      {img?.length > 0 ? (
        <Carousel className={`${carouselClassName}`}>
          {img.map((image, i) => {
            return (
              <div key={image}>
                <img src={image} alt="9" className="img9-event-details" />
              </div>
            );
          })}
        </Carousel>
      ) : (
        <Carousel className="datark">
          <div></div>
        </Carousel>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(null, mapDispatchToProps)(SliderOfImages);
