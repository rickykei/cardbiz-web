import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ClientsList = React.lazy(() =>
  import(/* webpackChunkName: "ui-forms" */ './clients-list')
);
const ClientsAdd = React.lazy(() =>
import(/* webpackChunkName: "ui-forms" */ './clients-add')
);

const Clients = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients-list`} />
      <Route
        path={`${match.url}/clients-list`}
        render={(props) => <ClientsList {...props} />}
      /><Route
      path={`${match.url}/clients-add`}
      render={(props) => <ClientsAdd {...props} />}
    />
       <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Clients;
