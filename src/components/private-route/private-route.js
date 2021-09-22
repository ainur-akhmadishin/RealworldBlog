import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isAuth) {
        return (
          <Redirect
            to={{
              pathname: 'sign-in',
            }}
          />
        );
      }
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = (state) => {
  const { isAuth } = state.user;
  return { isAuth };
};

PrivateRoute.defaultProps = {
  component: {},
  isAuth: false,
};

PrivateRoute.propTypes = {
  component: PropTypes.instanceOf(Object),
  isAuth: PropTypes.bool,
};

export default connect(mapStateToProps, null)(PrivateRoute);
