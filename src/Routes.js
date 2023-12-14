import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import WithHeaderAndFooterRoute from "./layouts/WithHeaderAndFooterRoute";
import WithOnlyHeaderRoute from "./layouts/WithOnlyHeaderRoute/WithOnlyHeaderRoute";
import Events from "./pages/Events/Events";
import EventCardDescription from "./pages/Events/EventCardDescription/EventCardDescription";
import Members from "./pages/Members";
import { handleFormChange } from "./store";
import { connect } from "react-redux";
import NewsRoom from "./pages/News/NewsRoom";
import NewsDescription from "./pages/News/NewsDescription";
import NewsArchive from "./pages/News/NewsArchive";
import Join from "././pages/Join";
import WithoutHeaderAndFooterRoute from "./layouts/WithoutHeaderAndFooterRoute/WithoutHeaderAndFooterRoute";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import Contacts from "./pages/Contacts/Contacts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import NewsDetails from "./pages/News/NewsDetails/NewsDetails";

function Routes() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <WithHeaderAndFooterRoute
              path="/"
              exact
              component={Home}
            ></WithHeaderAndFooterRoute>

            <WithOnlyHeaderRoute
              path="/pages/Events"
              exact
              component={Events}
            ></WithOnlyHeaderRoute>

            <WithHeaderAndFooterRoute
              path="/pages/EventCard/:eventCardId"
              exact
              component={EventCardDescription}
            ></WithHeaderAndFooterRoute>

            <WithHeaderAndFooterRoute
              path="/pages/NewsCard/:newsCardId"
              exact
              component={NewsDetails}
            ></WithHeaderAndFooterRoute>

            <WithOnlyHeaderRoute
              path="/pages/Members"
              exact
              component={Members}
            ></WithOnlyHeaderRoute>

            <WithOnlyHeaderRoute
              path="/pages/NewsRoom"
              exact
              component={NewsRoom}
            ></WithOnlyHeaderRoute>

            <WithHeaderAndFooterRoute
              path="/news/archive"
              exact
              component={NewsArchive}
            ></WithHeaderAndFooterRoute>

            <WithHeaderAndFooterRoute
              path="/terms"
              exact
              component={TermsAndConditions}
            ></WithHeaderAndFooterRoute>

            <WithHeaderAndFooterRoute
              path="/privacy"
              exact
              component={PrivacyPolicy}
            ></WithHeaderAndFooterRoute>

            <WithHeaderAndFooterRoute
              path="/pages/Contacts"
              exact
              component={Contacts}
            ></WithHeaderAndFooterRoute>

            <WithHeaderAndFooterRoute
              path="/news/:newsId"
              exact
              component={NewsDescription}
            ></WithHeaderAndFooterRoute>

            <WithoutHeaderAndFooterRoute
              path="/pages/Join"
              exact
              component={Join}
            ></WithoutHeaderAndFooterRoute>

            <Redirect to="/" />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleFormChange: (key, value) => dispatch(handleFormChange(key, value)),
  };
};
export default connect(null, mapDispatchToProps)(Routes);
