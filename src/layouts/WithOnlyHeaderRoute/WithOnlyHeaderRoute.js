import React from "react";
import { Route } from "react-router-dom";
import WithOnlyHeader from "./WithOnlyHeader";



const WithOnlyHeaderRoute = ({ component:Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <WithOnlyHeader>
          {/* {components.map((Component) => ( */}
            <Component {...props} />
          {/* ))} */}
        </WithOnlyHeader>
      )}
    />
  );
};

export default WithOnlyHeaderRoute;
