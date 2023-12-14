import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import { connect } from "react-redux";
import "./WithHeaderAndFooter.css";
import { handleFormChange } from "../../../store";
import Join from "../../../pages/Join";

const WithHeaderAndFooter = ({ handleFormChange, children, ...rest }) => {
  return (
    <div className="header-and-footer-container">
      <Header />
      {/* <div className="sidebar-container"> */}
      <SideBar />
      
        <Join />
    
      {/* </div> */}

      <section>
        {/* <article> */}
        {children}
        {/* </article> */}
      </section>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(null, mapDispatchToProps)(WithHeaderAndFooter);
