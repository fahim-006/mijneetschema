import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateUserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user_role") && localStorage.getItem("user_role") !== "undefined" && localStorage.getItem("user_role") ==='3' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user-login",
              // state: { from: props.location}
            }}
          />
        )
      }
    />
  );
};

export default PrivateUserRoute;
