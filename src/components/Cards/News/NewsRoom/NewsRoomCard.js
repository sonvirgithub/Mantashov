import React, { useEffect, useRef, useState } from "react";
import "./NewsRoomCard.css";
import NewsComponent2 from "../NewsComponent/NewsComponent";
import { useHistory } from "react-router-dom";
import emptyImage from "../../../../images/empty.jpg";

function NewsRoomCard({ cardData }) {
  let history = useHistory();
  const imageRef = useRef();
  const [image, setImage] = useState();

  const handleClick = () => {
    history.push(`/pages/NewsCard/${cardData.id}`);
  };

  useEffect(() => {
    setImage(cardData.image);
  }, [cardData]);

  useEffect(() => {
    if (imageRef.current.naturalHeight === 0) {
      setImage(emptyImage);
    }
  }, [imageRef]);
  return (
    <div className="news-card-container" key={cardData.id}>
      <div className="position-relative news-card-img-container">
        <img
          // src={cardData.image ?? emptyImage}
          src={require("../../../../images/news/new1.png")}
          className="news-card-img"
          alt=""
          ref={imageRef}
        />
        <img
          onClick={handleClick}
          src={require("../../../../images/right-arrow-byCicle.svg").default}
          alt="card-newsRoom-right-arrow"
          className="position-absolute cursor-pointer news-card-arrow"
        />
      </div>
      <NewsComponent2
        id={cardData.id}
        title={cardData.title}
        description={cardData.description}
        date={cardData.createdDate}
        text={cardData.text}
      />
    </div>
  );
}

export default NewsRoomCard;
