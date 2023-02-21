import React, { useState,useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { verifyToken } from 'redux/actions';

   
const Verify = ({ history, loading, error, email,password, verifyTokenAction}) => {
 
  const [token] = useState('');
 
  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Token Error', 3000, null, null, '');
    }
  }, [error]);

  const onUserLogin = (values) => {
     
    const values2 = {...values,email,password };
    
    if (!loading) {
      if (values2.token !== '' ) {
        console.log(values2);   
        verifyTokenAction(values2, history);
      }
    }
  };

  const initialValues = { token };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">Business Card 2.0 Evolution</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please contact us for registration..
            </p>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.verify-title" />
            </CardTitle>

            <Formik  initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.tokeninput" />
                    </Label>
                    <Field
                      className="form-control"
                      name="token"
                       
                    />
                    {errors.token && touched.token && (
                      <div className="invalid-feedback d-block">
                        {errors.token}
                      </div>
                    )}
                  </FormGroup>
             
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user">
                      <IntlMessages id="user.back-to-login" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error,email,password } = authUser;

  return { loading, error,email,password};
};

export default connect(mapStateToProps, {
  verifyTokenAction: verifyToken,
})(Verify);
