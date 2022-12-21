/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { CustomInput, Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, CardTitle, } from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import 'dropzone/dist/min/dropzone.min.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { addStaffItem } from 'redux/actions';
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { servicePath2 } from 'constants/defaultValues';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';



const apiUrl = `${servicePath2}/companies/codelist`;


const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
  postUrl: 'no-url',

};
const dropzoneConfig = {
  autoProcessQueue: false,
  thumbnailHeight: 160,
  maxFilesize: 10,
  maxFiles: 1,
  acceptedFiles: ".jpeg,.jpg,.png,.gif",
  uploadMultiple: false,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{' '}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {' '}
            <span data-dz-name />{' '}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {' '}
        <i className="glyph-icon simple-icon-trash" />{' '}
      </a>
    </div>
  ),
  headers: { 'My-Awesome-Header': 'header value' },
};



const AddNewStaffModal = ({
  addStaffItemAction, intl, match, currentUser
}) => {

  const initialState = {
    id: null,
    name_eng: "",
    name_chi: "",
    company_id: 0,
    companies: [],
    headshot: "",
    rc_no: "",
    staff_no: "",
    title_eng: "",
    title_chi: "",
    pro_title: "",
    subsidiary_eng: "",
    subsidiary_chi: "",
    work_email: "",
    work_tel: "",
    direct_tel: "",
    mobile_tel: "",
    fax_no: "",
    reuters: "",
    address_eng: "",
    address_chi: "",
    agent_no: "",
    broker_no: "",
    mpf_no:"",
    hkma_no:"",
    hkma_eng:"",
    hkma_chi:"",
    smartcard_uid: "",
    bizcard_option: true,
    updated_by: "630cf0461fa3f166eb3dee01",
    created_by: "630cf0461fa3f166eb3dee01",
    status: true,

  };
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const [selectedOptionLO, setSelectedOptionLO] = useState('');
  const [options, setOptions] = useState([]);
  const [file2, setFile] = useState(null);
  const { messages } = intl;


  const addNetItem = () => {
    const newItem = {
      name_eng: state.name_eng,
      name_chi: state.name_chi,
      rc_no: state.rc_no,
      staff_no: state.staff_no,
      title_eng: state.title_eng,
      title_chi: state.title_chi,
      pro_title: state.pro_title,
      subsidiary_eng: state.subsidiary_eng,
      subsidiary_chi: state.subsidiary_chi,
      company_id: selectedOptionLO.value,
      headshot: state.headshot,
      work_email: state.work_email,
      work_tel: state.work_tel,
      direct_tel: state.direct_tel,
      mobile_tel: state.mobile_tel,
      fax_no: state.fax_no,
      address_eng: state.address_eng,
      address_chi: state.address_chi,
      agent_no: state.agent_no,
      broker_no: state.broker_no,
      mpf_no:state.mpf_no,
      hkma_chi:state.hkma_chi,
      hkma_eng:state.hkma_eng,
      smartcard_uid: state.smartcard_uid,
      bizcard_option: state.bizcard_option,
      updatedBy:  currentUser.uid,
      createdBy:  currentUser.uid,
      status: state.status,

    };
    const data = new FormData()

    if (file2 !== null)
      data.append("file", file2);

    /* eslint-disable no-restricted-syntax */

    for (const [key, val] of Object.entries(newItem)) {
      
      if (key === "company_id") {
        if (val === undefined) {
          data.append(key, currentUser.companyId);
        }  else {
          data.append(key, val);
        }
      } else {
        data.append(key, val);
      }
    }


    addStaffItemAction(data);

    history.push("/app/staffs/staffs-list");

    setState(initialState);
  };

  async function fetchData() {
    axios.get(`${apiUrl}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {

        setOptions(
          data
        );
      })
      .catch(error => {

        console.error('There was an error!', error);
      })


  }

  useEffect(() => {

    fetchData();
  }, []);

  const eventHandlers = {
    addedfile: (file) => {
      setFile(file);
    }
  }



  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.users-add" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Form>

                <Card className="mb-4">
                  <CardBody>
                     
                    
                          <Row>
                      <Colxx xxs="12" md="6" className="mb-5">
                        <FormGroup>
                          <Label for="name_eng">
                            <IntlMessages id="forms.staff-name_eng" />
                          </Label>
                          <Input
                            type="text"
                            value={state.name_eng || ''}
                            onChange={(val) => setState({ ...state, name_eng: val.target.value })}
                            placeholder={messages['forms.staff-name_eng']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.staff-name_eng-muted" />
                          </FormText>
                        </FormGroup>

                      </Colxx>
                      <Colxx xxs="12" md="6">


                        <FormGroup>
                          <Label for="name_chi">
                            <IntlMessages id="forms.staff-name_chi" />
                          </Label>
                          <Input
                            type="text"
                            value={state.name_chi || ''}
                            onChange={(val) => setState({ ...state, name_chi: val.target.value })}
                            placeholder={messages['forms.staff-name_chi']}
                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.staff-name_chi-muted" />
                          </FormText>
                        </FormGroup>
                      </Colxx>
                   </Row>

                  </CardBody>
                </Card>
                {(currentUser.companyId === '123321') &&
                <Row className="mb-4">
                  <Colxx xxs="12">
                    <Card>
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="form-staff-headshot" />
                        </CardTitle>
                        <DropzoneComponent
                          config={dropzoneComponentConfig}
                          djsConfig={dropzoneConfig}
                          eventHandlers={eventHandlers} multiple={false} />

                      </CardBody>
                    </Card>
                  </Colxx>
                </Row>  }
                {(currentUser.companyId === '63142fd5b54bdbb18f556016') &&
                  <FormGroup>
                    <Label className="mt-4">
                      <IntlMessages id="forms.user-company" />   
                    </Label>

                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={options}
                      value={selectedOptionLO}
                      onChange={(val) => setSelectedOptionLO(val)}
                    />
                  </FormGroup>
                }

              <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="rc_no">
                        <IntlMessages id="forms.staff-rc_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.rc_no || ''}
                        onChange={(val) => setState({ ...state, rc_no: val.target.value })}
                        placeholder={messages['forms.staff-rc_no']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-rc_no-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="staff_no">
                        <IntlMessages id="forms.staff-staff_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.staff_no || ''}
                        onChange={(val) => setState({ ...state, staff_no: val.target.value })}
                        placeholder={messages['forms.staff-staff_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-staff_no-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="title_eng">
                        <IntlMessages id="forms.staff-title_eng" />
                      </Label>
                      <Input
                        type="text"
                        value={state.title_eng || ''}
                        onChange={(val) => setState({ ...state, title_eng: val.target.value })}
                        placeholder={messages['forms.staff-title_eng']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-title_eng-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="title_chi">
                        <IntlMessages id="forms.staff-title_chi" />
                      </Label>
                      <Input
                        type="text"
                        value={state.title_chi || ''}
                        onChange={(val) => setState({ ...state, title_chi: val.target.value })}
                        placeholder={messages['forms.staff-title_chi']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-title_chi-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="pro_title">
                        <IntlMessages id="forms.staff-pro_title" />
                      </Label>
                      <Input
                        type="text"
                        value={state.pro_title || ''}
                        onChange={(val) => setState({ ...state, pro_title: val.target.value })}
                        placeholder={messages['forms.staff-pro_title']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-pro_title-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                    <FormGroup>
                      <Label for="work_email">
                        <IntlMessages id="forms.staff-work_email" />
                      </Label>
                      <Input
                        type="text"
                        value={state.work_email || ''}
                        onChange={(val) => setState({ ...state, work_email: val.target.value })}
                        placeholder={messages['forms.staff-work_email']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_email-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="subsidiary_eng">
                        <IntlMessages id="forms.staff-subsidiary_eng" />
                      </Label>
                      <Input
                        type="text"
                        value={state.subsidiary_eng || ''}
                        onChange={(val) => setState({ ...state, subsidiary_eng: val.target.value })}
                        placeholder={messages['forms.staff-subsidiary_eng']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-subsidiary_eng-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                    <FormGroup>
                      <Label for="subsidiary_chi">
                        <IntlMessages id="forms.staff-subsidiary_chi" />
                      </Label>
                      <Input
                        type="text"
                        value={state.subsidiary_chi || ''}
                        onChange={(val) => setState({ ...state, subsidiary_chi: val.target.value })}
                        placeholder={messages['forms.staff-subsidiary_chi']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-subsidiary_chi-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="address_eng">
                        <IntlMessages id="forms.staff-address_eng" />
                      </Label>
                      <Input
                        type="text"
                        value={state.address_eng || ''}
                        onChange={(val) => setState({ ...state, address_eng: val.target.value })}
                        placeholder={messages['forms.staff-address_eng']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address_eng-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="address_chi">
                        <IntlMessages id="forms.staff-address_chi" />
                      </Label>
                      <Input
                        type="text"
                        value={state.address_chi || ''}
                        onChange={(val) => setState({ ...state, address_chi: val.target.value })}
                        placeholder={messages['forms.staff-address_chi']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address_chi-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="work_tel">
                        <IntlMessages id="forms.staff-work_tel" />
                      </Label>
                      <Input
                        type="text"
                        value={state.work_tel || ''}
                        onChange={(val) => setState({ ...state, work_tel: val.target.value })}
                        placeholder={messages['forms.staff-work_tel']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_tel-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                    <FormGroup>
                      <Label for="direct_tel">
                        <IntlMessages id="forms.staff-direct_tel" />
                      </Label>
                      <Input
                        type="text"
                        value={state.direct_tel || ''}
                        onChange={(val) => setState({ ...state, direct_tel: val.target.value })}
                        placeholder={messages['forms.staff-direct_tel']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-direct_tel-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="mobile_tel">
                        <IntlMessages id="forms.staff-mobile_tel" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mobile_tel || ''}
                        onChange={(val) => setState({ ...state, mobile_tel: val.target.value })}
                        placeholder={messages['forms.staff-mobile_tel']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile_tel-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="fax_no">
                        <IntlMessages id="forms.staff-fax_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.fax_no || ''}
                        onChange={(val) => setState({ ...state, fax_no: val.target.value })}
                        placeholder={messages['forms.staff-fax_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-fax_no-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="reuters">
                        <IntlMessages id="forms.staff-reuters" />
                      </Label>
                      <Input
                        type="text"
                        value={state.reuters || ''}
                        onChange={(val) => setState({ ...state, reuters: val.target.value })}
                        placeholder={messages['forms.staff-reuters']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-reuters-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="mpf_no">
                        <IntlMessages id="forms.staff-mpf_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mpf_no || ''}
                        onChange={(val) => setState({ ...state, mpf_no: val.target.value })}
                        placeholder={messages['forms.staff-mpf_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mpf_no-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="agent_no">
                        <IntlMessages id="forms.staff-agent_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.agent_no || ''}
                        onChange={(val) => setState({ ...state, agent_no: val.target.value })}
                        placeholder={messages['forms.staff-agent_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-agent_no-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="broker_no">
                        <IntlMessages id="forms.staff-broker_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.broker_no || ''}
                        onChange={(val) => setState({ ...state, broker_no: val.target.value })}
                        placeholder={messages['forms.staff-broker_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-broker_no-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

               

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="hkma_eng">
                        <IntlMessages id="forms.staff-hkma_eng" />
                      </Label>
                      <Input
                        type="text"
                        value={state.hkma_eng || ''}
                        onChange={(val) => setState({ ...state, hkma_eng: val.target.value })}
                        placeholder={messages['forms.staff-hkma_eng']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-hkma_eng-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="hkma_chi">
                        <IntlMessages id="forms.staff-hkma_chi" />
                      </Label>
                      <Input
                        type="text"
                        value={state.hkma_chi || ''}
                        onChange={(val) => setState({ ...state, hkma_chi: val.target.value })}
                        placeholder={messages['forms.staff-hkma_chi']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-hkma_chi-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                 
 


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="hkma_no">
                        <IntlMessages id="forms.staff-hkma_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.hkma_no || ''}
                        onChange={(val) => setState({ ...state, hkma_no: val.target.value })}
                        placeholder={messages['forms.staff-hkma_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-hkma_no-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="smartcard_uid">
                        <IntlMessages id="forms.staff-smartcard_uid" />
                      </Label>
                      <Input
                        type="text"
                        value={state.smartcard_uid || ''}
                        onChange={(val) => setState({ ...state, smartcard_uid: val.target.value })}
                        placeholder={messages['forms.staff-smartcard_uid']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-smartcard_uid-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-bizcard_option" />
                      </Label>
                      <CustomInput
                        type="radio"
                        id="exCustomRadio2"
                        name="customRadio2"
                        label="eprofile"
                        checked={state.bizcard_option === true}
                        onChange={(event) =>
                          setState({
                            ...state,
                            bizcard_option: event.target.value === 'on',
                          })
                        }
                      />


                      <CustomInput
                        type="radio"
                        id="exCustomRadio"
                        name="customRadio"
                        label="vcf"
                        checked={state.bizcard_option === false}
                        onChange={(event) =>
                          setState({
                            ...state,
                            bizcard_option: event.target.value !== 'on',
                          })
                        }
                      />


                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label>
                        <IntlMessages id="forms.staff-status" />
                      </Label>
                      <CustomInput
                        type="radio"
                        id="exCustomRadio3"
                        name="customRadio3"
                        label="Active"
                        checked={state.status === true}
                        onChange={(event) =>
                          setState({
                            ...state,
                            status: event.target.value === 'on',
                          })
                        }
                      />


                      <CustomInput
                        type="radio"
                        id="exCustomRadio4"
                        name="customRadio4"
                        label="Disable"
                        checked={state.status === false}
                        onChange={(event) =>
                          setState({
                            ...state,
                            status: event.target.value !== 'on',
                          })
                        }
                      />


                    </FormGroup>

                  </Colxx>
                </Row>
                <Button color="primary" className="mt-4" onClick={() => addNetItem()}>
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
const mapStateToProps = ({ staffListApp, authUser }) => {
  const { companies } = staffListApp;
  const { currentUser } = authUser;
  return {
    companies,
    currentUser
  };
};
export default injectIntl(connect(mapStateToProps, {
  addStaffItemAction: addStaffItem,
})(AddNewStaffModal));
