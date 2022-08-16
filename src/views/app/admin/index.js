import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const AdminList = React.lazy(() =>
  import(/* webpackChunkName: "admin-list" */ './admin-list')
);
 

const Admin = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/admin-list`} />
      <Route
        path={`${match.url}/admin-list`}
        render={(props) => <AdminList {...props} />}
      />
       <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Admin;
