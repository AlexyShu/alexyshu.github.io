import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const PrivateRouteForLogin = (props) => {
  const {render, path, exact, authorizationStatus} = props;
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.NO_AUTH
            ? render()
            : <Redirect to={AppRoute.MAIN} />
        );
      }}
    />
  );
};

PrivateRouteForLogin.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRouteForLogin;
