import React, { createContext, useEffect, useState } from "react";
import Routes from "./Routes";
import "./App.css";
import { useCookies } from "react-cookie";
// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { handleFormChange } from "./store";
import { connect } from "react-redux";
// export const HOST = "https://admin.mantashov.org"
export const HOST = "";
// export const HOST = "192.168.1.11:5000"

export const LanguageContext = createContext({});

function App({ handleFormChange }) {
  const [cookies] = useCookies();

  const [translatedData, setTranslatedData] = useState({});
  const [lng, setLng] = useState("en");

  useEffect(() => {
    if (cookies.lang) {
      setLng(cookies.lang);
    } else setLng("en");
  }, [cookies.lang]);

  const data1 = [];
  const colors = [];

  const autoScroll = (data) => {
    const color = ["#FF453A", "#FF9F0A", "#FFD60A", "#32D74B", "#64D2FF"];
    data.whoIsBullets.map((bul, j) => {
      color.map((cl, i) => {
        colors.push(cl);
      });
    });

    colors.pop();

    data.whoIsBullets?.map((bul, i) => {
      data1.push({
        id: i + 1,
        title: bul,
        text: "and music as you join them",
        color: colors[i],
      });
    });
    if (data1[0].color === data1[data1.length - 1].color) {
      data1[data1.length - 1].color = data1[2].color;
    }
    handleFormChange("data1", data1);
  };

  useEffect(() => {
    fetch(`${HOST}/api/other/lng/${lng}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTranslatedData(data);
        autoScroll(data);
      })
      .catch((error) => {});
  }, [lng]);

  return (
    <>
      <LanguageContext.Provider value={translatedData}>
        <Routes />
      </LanguageContext.Provider>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};

export default connect(null, mapDispatchToProps)(App);
