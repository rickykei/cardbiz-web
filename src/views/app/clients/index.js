import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ClientsList = React.lazy(() =>
  import(/* webpackChunkName: "ui-forms" */ './clients-list')
);
const ClientAdd = React.lazy(() =>
import(/* webpackChunkName: "ui-forms" */ './client-add')
);
const ClientDel = React.lazy(() =>
import(/* webpackChunkName: "ui-forms" */ './client-del')
);
const Clients = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients-list`} />
      <Route
        path={`${match.url}/clients-list`}
        render={(props) => <ClientsList {...props} />}
      /><Route
      path={`${match.url}/client-add`}
      render={(props) => <ClientAdd {...props} />}
    /><Route
  path={`${match.url}/client-del/:id`}
  render={(props) => <ClientDel {...props} />}
/>
       <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Clients;
