import React, { useEffect, useState, useContext } from "react";
import "./header.css";
import { connect } from "react-redux";
import { handleFormChange, setSidebarOpen, getTurnovers } from "../../../store";
import { Link, useHistory } from "react-router-dom";
import SelectLanguage from "../../../components/SelectLanguage";
import { useParams } from "react-router";
import { LanguageContext } from "../../../App";
import { useCookies } from "react-cookie";

function Header({
  setSidebarOpen,
  headerColorBlack,
  handleFormChange,
  headerPosFixed,
  sideBarClose,
  sideBarOpen,
  getTurnovers,
}) {
  let history = useHistory();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { eventCardId } = useParams();
  const translatedData = useContext(LanguageContext);
  const [cookies] = useCookies();

  var userLang = navigator.language || navigator.userLanguage;

  const lng = cookies.lang ? cookies.lang : userLang.split("-")[0];

  const languages = [
    {
      lang: "en",
      name: "En",
    },
    {
      lang: "am",
      name: "Հայ",
    },
    {
      lang: "ru",
      name: "Ру",
    },
  ];

  useEffect(() => {
    eventCardId !== undefined
      ? handleFormChange("headerColorBlack", true)
      : handleFormChange("headerColorBlack", false);
  }, [eventCardId]);

  useEffect(() => {
    const newWidth = windowWidth;
    setWindowWidth(newWidth);
  }, [windowWidth]);

  const handleClick = () => {
    setSidebarOpen();
    document.body.classList.add("sideBar-opened");
    handleFormChange("barOpen", true);
  };

  const openJoinPage = () => {
    document.body.classList.add("sideBar-opened");
    handleFormChange("joinOpen", true);
  };

  const goToHome = () => {
    // window.scrollTo(0, 0)
    // scrollToTop()
    history.push("/");
    // window.location.reload()
  };

  return (
    <header
      className={`header-container flex-space-between
       ${
         !headerColorBlack
           ? "header-background-color-gray"
           : "header-background-color-black"
       }`}
    >
      <div className="menu-icon-container cursor-pointer" onClick={handleClick}>
        <img
          src={require("../../../images/menu-icon.svg").default}
          alt="menu"
          className="menu-img"
        />
        <span
          className={`header-menu-text ${
            !headerColorBlack ? "color-black" : "color-white"
          }`}
          lang={lng}
        >
          {/* Menu */}
          {translatedData.menu ?? "Menu"} 
        </span>
      </div>

      <div className="name-container cursor-pointer">
        <Link
          onClick={goToHome}
          to="/"
          className={`header-name-text cursor-pointer ${
            !headerColorBlack ? "color-black" : "header-text-white"
          }`}
        >
          <svg className="header-svg" viewBox="0 0 114 15" fill="red">
            <path
              d="M0.242 1.148V14H2.888V4.982H2.924L6.074 14H8.252L11.402 4.892H11.438V14H14.084V1.148H10.106L7.262 9.986H7.226L4.22 1.148H0.242ZM19.8121 9.032L21.4861 4.316H21.5221L23.1421 9.032H19.8121ZM20.0821 1.148L15.2221 14H18.0661L19.0741 11.138H23.8801L24.8521 14H27.7861L22.9801 1.148H20.0821ZM28.8943 1.148V14H31.5403V5.396H31.5763L36.9223 14H39.7483V1.148H37.1023V9.77H37.0663L31.7023 1.148H28.8943ZM45.0801 3.524V14H47.9061V3.524H51.7581V1.148H41.2281V3.524H45.0801ZM54.8277 9.032L56.5017 4.316H56.5377L58.1577 9.032H54.8277ZM55.0977 1.148L50.2377 14H53.0817L54.0897 11.138H58.8957L59.8677 14H62.8017L57.9957 1.148H55.0977ZM65.836 9.734H63.1C63.088 10.526 63.232 11.21 63.532 11.786C63.832 12.362 64.234 12.836 64.738 13.208C65.254 13.58 65.842 13.85 66.502 14.018C67.174 14.198 67.864 14.288 68.572 14.288C69.448 14.288 70.216 14.186 70.876 13.982C71.548 13.778 72.106 13.496 72.55 13.136C73.006 12.764 73.348 12.326 73.576 11.822C73.804 11.318 73.918 10.772 73.918 10.184C73.918 9.464 73.762 8.876 73.45 8.42C73.15 7.952 72.79 7.58 72.37 7.304C71.95 7.028 71.524 6.83 71.092 6.71C70.672 6.578 70.342 6.488 70.102 6.44C69.298 6.236 68.644 6.068 68.14 5.936C67.648 5.804 67.258 5.672 66.97 5.54C66.694 5.408 66.508 5.264 66.412 5.108C66.316 4.952 66.268 4.748 66.268 4.496C66.268 4.22 66.328 3.992 66.448 3.812C66.568 3.632 66.718 3.482 66.898 3.362C67.09 3.242 67.3 3.158 67.528 3.11C67.756 3.062 67.984 3.038 68.212 3.038C68.56 3.038 68.878 3.068 69.166 3.128C69.466 3.188 69.73 3.29 69.958 3.434C70.186 3.578 70.366 3.776 70.498 4.028C70.642 4.28 70.726 4.598 70.75 4.982H73.486C73.486 4.238 73.342 3.608 73.054 3.092C72.778 2.564 72.4 2.132 71.92 1.796C71.44 1.46 70.888 1.22 70.264 1.076C69.652 0.92 69.01 0.842 68.338 0.842C67.762 0.842 67.186 0.92 66.61 1.076C66.034 1.232 65.518 1.472 65.062 1.796C64.606 2.12 64.234 2.528 63.946 3.02C63.67 3.5 63.532 4.07 63.532 4.73C63.532 5.318 63.64 5.822 63.856 6.242C64.084 6.65 64.378 6.992 64.738 7.268C65.098 7.544 65.506 7.772 65.962 7.952C66.418 8.12 66.886 8.264 67.366 8.384C67.834 8.516 68.296 8.636 68.752 8.744C69.208 8.852 69.616 8.978 69.976 9.122C70.336 9.266 70.624 9.446 70.84 9.662C71.068 9.878 71.182 10.16 71.182 10.508C71.182 10.832 71.098 11.102 70.93 11.318C70.762 11.522 70.552 11.684 70.3 11.804C70.048 11.924 69.778 12.008 69.49 12.056C69.202 12.092 68.932 12.11 68.68 12.11C68.308 12.11 67.948 12.068 67.6 11.984C67.252 11.888 66.946 11.75 66.682 11.57C66.43 11.378 66.226 11.132 66.07 10.832C65.914 10.532 65.836 10.166 65.836 9.734ZM75.5994 1.148V14H78.4254V8.456H83.6274V14H86.4534V1.148H83.6274V6.08H78.4254V1.148H75.5994ZM91.2092 7.628C91.2092 7.064 91.2692 6.518 91.3892 5.99C91.5212 5.462 91.7252 4.994 92.0012 4.586C92.2772 4.166 92.6372 3.836 93.0812 3.596C93.5252 3.344 94.0652 3.218 94.7012 3.218C95.3372 3.218 95.8772 3.344 96.3212 3.596C96.7652 3.836 97.1252 4.166 97.4012 4.586C97.6772 4.994 97.8752 5.462 97.9952 5.99C98.1272 6.518 98.1932 7.064 98.1932 7.628C98.1932 8.168 98.1272 8.696 97.9952 9.212C97.8752 9.716 97.6772 10.172 97.4012 10.58C97.1252 10.988 96.7652 11.318 96.3212 11.57C95.8772 11.81 95.3372 11.93 94.7012 11.93C94.0652 11.93 93.5252 11.81 93.0812 11.57C92.6372 11.318 92.2772 10.988 92.0012 10.58C91.7252 10.172 91.5212 9.716 91.3892 9.212C91.2692 8.696 91.2092 8.168 91.2092 7.628ZM88.3832 7.628C88.3832 8.564 88.5272 9.44 88.8152 10.256C89.1032 11.06 89.5172 11.762 90.0572 12.362C90.5972 12.962 91.2572 13.436 92.0372 13.784C92.8292 14.12 93.7172 14.288 94.7012 14.288C95.6972 14.288 96.5852 14.12 97.3652 13.784C98.1452 13.436 98.8052 12.962 99.3452 12.362C99.8852 11.762 100.299 11.06 100.587 10.256C100.875 9.44 101.019 8.564 101.019 7.628C101.019 6.668 100.875 5.78 100.587 4.964C100.299 4.136 99.8852 3.416 99.3452 2.804C98.8052 2.192 98.1452 1.712 97.3652 1.364C96.5852 1.016 95.6972 0.842 94.7012 0.842C93.7172 0.842 92.8292 1.016 92.0372 1.364C91.2572 1.712 90.5972 2.192 90.0572 2.804C89.5172 3.416 89.1032 4.136 88.8152 4.964C88.5272 5.78 88.3832 6.668 88.3832 7.628ZM108.927 14L113.193 1.148H110.277L107.379 10.184H107.343L104.481 1.148H101.583L105.741 14H108.927Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>

      <div className="flex-space-between" style={{ height: "100%" }}>
        <div
          className="header-join-btn cursor-pointer background-dark-blue"
          lang={lng}
          onClick={() => openJoinPage()}
        >
          <p className="join-btn-text color-white" lang={lng}>
            {/* Join */}
            {translatedData.join ?? "Join"}
          </p>
        </div>
        <SelectLanguage
          containerClass="header-language-container"
          className="header-language"
          languages={languages}
          selected="En"
        />
      </div>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    sideBarOpen: state.sideBarReducer.sideBarOpen,
    sideBarClose: state.sideBarReducer.sideBarClose,
    headerColorBlack: state.formReducer.headerColorBlack,
    headerPosFixed: state.formReducer.headerPosFixed,
    sideBarClose: state.formReducer.sideBarClose,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSidebarOpen: () => dispatch(setSidebarOpen()),
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
    getTurnovers: () => dispatch(getTurnovers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
