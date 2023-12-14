import React from "react";
import { Route } from "react-router-dom";
import WithoutHeaderAndFooter from "./WithoutHeaderAndFooter";


const WithoutHeaderAndFooterRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                <WithoutHeaderAndFooter>
                    <Component {...props} />
                </WithoutHeaderAndFooter>
            )}
        />
    );
};

export default WithoutHeaderAndFooterRoute;
