import React from 'react';
import { Route, unstable_HistoryRouter, useHistory } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  const history = unstable_HistoryRouter();

  if (!token) {
    history.push('/login');
  }

  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : null)} />;
};

export default PrivateRoute;