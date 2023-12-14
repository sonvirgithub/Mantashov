import React from "react";
import Join from "../../../pages/Join";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

const WithOnlyHeader = ({ children, ...rest }) => {
  return (
    <div className="header-and-footer-container">
      <Header />
      <SideBar />
   
        <Join />
     
      <section>
        <article>{children}</article>
      </section>
    </div>
  );
};
export default WithOnlyHeader;
