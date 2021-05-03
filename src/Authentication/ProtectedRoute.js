import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => {
    return state.reducer.isAuthenticated;
  });
  const isVerifying = useSelector((state) => {
    return state.reducer.isVerifying;
  });
  return (
    <Route
      {...rest}
      render={(props) => {
        return isVerifying === true ? (
          <div></div>
        ) : isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        );
      }}
    ></Route>
  );
}

export default ProtectedRoute;
