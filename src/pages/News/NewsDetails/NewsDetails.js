import React, { useEffect, useContext } from "react";
import "./NewsDetails.css";
import { handleFormChange, fetchNewsDetails } from "../../../store";
import { connect } from "react-redux";
import { useParams } from "react-router";
// import img1 from "../../../images/img1-news-card.svg";
// import img2 from "../../../images/img2-news-card.svg";
import List from "../../../components/List/List";
import LatestNews from "../../../components/Cards/News/LatestNews/LatestNews";
import { useQuery } from "../../../functions/useQuery";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import SliderOfImages from "../../../components/SliderOfImages";
import ContentOfDetails from "../../../components/ComponentOfDetails/ContentOfDetails";
import { LanguageContext } from "../../../App";
import ContactForJoin from "../../../components/Cards/Contact/components/ContactForJoin";

function NewsDetails({
  handleFormChange,
  fetchNewsDetails,
  newsDetails,
  newsName,
}) {
  const { newsCardId } = useParams();
  const query = useQuery();
  const history = useHistory();
  const [cookies] = useCookies();
  const translatedData = useContext(LanguageContext);

  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const regex = (url) => {
    const regex1 = /<iframe.*?src=['"](.*?)['"]/;
    return regex1?.exec(url)[1];
  };

  useEffect(() => {
    handleFormChange("headerColorBlack", false);
    handleFormChange("currentPageName", "News");

    var userLang = navigator.language || navigator.userLanguage;

    const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];
    fetchNewsDetails(newsCardId, lng);
  }, [newsCardId, cookies.lang]);

  const handleClick = () => {
    history.push(`/news/archive`);
  };

  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("joinOpen", true);
  };

  return (
    <div className="news-details-content">
      <div className="news-details-title-container  color-black">
        <p className="news-details-title  color-black" lang={lng}>
          {newsName}
        </p>
      </div>
      {newsDetails.map((news) => {
        return (
          <div className="news-details">
            {/* <div className="news-details-text"> */}
            {news?.topText ? (
              <p
                className="news-details-text color-black desc-one-news-details "
                lang={lng}
              >
                {news?.topText}
              </p>
            ) : null}
            {/* </div> */}
            {news?.images?.length > 0 ? (
              <SliderOfImages
                img={news?.images}
                carouselClassName="news-carousel"
              />
            ) : null}

            {news?.links?.length > 0
              ? news?.links.map((link) => {
                  return link.match(/(<iframe.+?<\/iframe>)/g) ? (
                    <iframe
                      width="560"
                      height="315"
                      className="link-video news-video-links"
                      src={regex(link)}
                    ></iframe>
                  ) : null;
                })
              : null}

            {news?.bottomText ? (
              <p className="news-details-text text2-new-details" lang={lng}>
                {news?.bottomText}
              </p>
            ) : null}

            {news?.videos?.map((vid) => (
              <video
                className="link-video video-of-details"
                controls="controls"
                // preload="metadata"
                // onLoad={() => {
                //   this.player.seek(0);
                // }}
                // paused={true}
              >
                <source src={`${vid}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        );
      })}

      <div className="news-info-for-share-container">
        <div className="news-sharing-info">
          <ContentOfDetails
            title="Share article"
            containerClassName="share-content-for-news share-info"
            links={["Facebook", "Instagram", "Linkedin", "Twitter"]}
            mode="light"
          />
          <ContentOfDetails
            title="Reference"
            containerClassName="share-content-for-news"
            mode="light"
          />
          <ContactForJoin containerClassName="contacts-component" />
        </div>
      </div>

      <div className="latest-news">
        <p className="latest-news-details font-bold-700">Latest News</p>

        <List
          Component={LatestNews}
          className="latestNewsList latest-news-container"
          url="/api/news"
          search={query.get("search")}
        />
        <p
          className="font-size-18 view-archive-news-details "
          lang={lng}
          onClick={handleClick}
        >
          {translatedData.viewAchive}
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    newsDetails: state.newsReducer.newsDetails,
    newsName: state.newsReducer.newsName,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    fetchNewsDetails: (id, lng) => dispatch(fetchNewsDetails(id, lng)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);
