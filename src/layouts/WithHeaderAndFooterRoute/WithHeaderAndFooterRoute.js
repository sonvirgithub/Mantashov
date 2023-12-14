import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "./WithHeaderAndFooterRoute.css";
import WithHeaderAndFooter from "./WithHeaderAndFooter";

const WithHeaderAndFooterRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <WithHeaderAndFooter>
          {/* {components.map((Component) => ( */}
          <Component {...props} />
          {/* ))} */}
        </WithHeaderAndFooter>
      )}
    />
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithHeaderAndFooterRoute);
