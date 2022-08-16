import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const StaffsList = React.lazy(() =>
  import(/* webpackChunkName: "staffs-list" */ './staffs-list')
);
 

const Staffs = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/staffs-list`} />
      <Route
        path={`${match.url}/staffs-list`}
        render={(props) => <StaffsList {...props} />}
      />
       <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Staffs;
