import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateTrainerRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("user_role") && localStorage.getItem("user_role") !== "undefined"  && localStorage.getItem("user_role") ==='2' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/trainer-login",
              // state: { from: props.location}
            }}
          />
        )
      }
    />
  );
};

export default PrivateTrainerRoute;
