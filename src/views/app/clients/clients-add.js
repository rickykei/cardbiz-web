import React from 'react';
import {  Row,  Card,  CardBody,  Input,    FormGroup,  Label,  Button,  FormText,  Form,} from 'reactstrap';
import { injectIntl } from 'react-intl';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IntlMessages from 'helpers/IntlMessages';
  
const FormLayoutsUi = ({ match, intl }) => {
  
  const { messages } = intl;

 

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.clients-add" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              
              <Form>
                <FormGroup>
                  <Label for="clientName">
                    <IntlMessages id="forms.client-name" />
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={messages['forms.client-name']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.email-muted" />
                  </FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="clientCode">
                    <IntlMessages id="forms.client-code" />
                  </Label>
                  <Input
                    type="text"
                    name="code"
                    id="code"
                    placeholder={messages['forms.client-code']}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="clientNoOfLiscense">
                    <IntlMessages id="forms.client-no_of_license" />
                  </Label>
                  <Input
                    type="text"
                    name="nooflicense"
                    id="nooflicense"
                    placeholder={messages['forms.client-no_of_license']}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="clientNoOfAdmin">
                    <IntlMessages id="forms.client-no_of_admin" />
                  </Label>
                  <Input
                    type="text"
                    name="noofadmin"
                    id="noofadmin"
                    placeholder={messages['forms.client-no_of_admin']}
                  />
                </FormGroup>

                <FormGroup>
                      <Label>
                        <IntlMessages id="forms.client-status" />
                      </Label>
                      <Input type="select"  name="status" id="status">
                        <option value="true">Active</option>
                        <option value="false">Disable</option>
                      </Input>
                    </FormGroup>
 

                <Button color="primary" className="mt-4"  onClick={this.saveClient}>
                  <IntlMessages id="forms.submit" />
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
 

           
    </>
  );
};

export default injectIntl(FormLayoutsUi);
