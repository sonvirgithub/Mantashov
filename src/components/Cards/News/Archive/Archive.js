import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import "./Archive.css";
import emptyImage from "../../../../images/empty.jpg";

function Archive({ image, createdDate, title, text, address, id }) {
  const [cookies] = useCookies();
  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const history = useHistory();

  const openNewsDetails = () => {
    history.push(`/pages/NewsCard/${id}`);
  };

  return (
    <div key={id} className="newsroom-archive-card" onClick={openNewsDetails}>
      <div>
        <img
          // src={require("../../../../images/img-card-speaker.svg").default}
          src={image ?? emptyImage}
          alt="archive-card-img"
          className="archive-card-img"
        />
      </div>

      <div className="archive-card-info flex-space-between">
        <div className="archive-card-info-texts">
          <p className="archive-card-date color-darker-gray" lang={lng}>
            {/* November 10, 2021 */}
            {createdDate}
          </p>
          <p className="archive-card-title  color-black" lang={lng}>
            {title}
          </p>
          <p className="archive-card-desc" lang={lng}>
            {text}
          </p>
        </div>

        <p className="archive-card-place" lang={lng}>
          {/* Yerevan, RA */}
          {address}
        </p>
      </div>
    </div>
  );
}

export default Archive;
