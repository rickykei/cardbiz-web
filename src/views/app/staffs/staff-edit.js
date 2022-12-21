/* eslint-disable import/no-extraneous-dependencies */
import React, { useState , useEffect} from 'react';
import { injectIntl } from 'react-intl';
import { CustomInput, Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, CardTitle,  } from 'reactstrap';
import 'react-tagsinput/react-tagsinput.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-switch/assets/index.css';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import axios from 'axios';
import Breadcrumb from 'containers/navs/Breadcrumb';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import StaffDataService from 'services/StaffsService';
import { connect } from 'react-redux';
import { useParams,useHistory } from "react-router-dom";
import { servicePath2 } from 'constants/defaultValues';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';

const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
  postUrl: 'no-url',
 
};
const dropzoneConfig = {
  autoProcessQueue: false,
  thumbnailHeight: 160,
  maxFilesize:10,
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



const EditClientModal = ({ intl, match, currentUser}) => {
 
  const { id } = useParams();
  const initialState = {
    id: null,
    name: "",
    code: "",
    no_of_license: "",
    no_of_admin: "",
    status: true,
    company_id: "",
     
  };
  const apiUrl = `${servicePath2}/companies/codelist`;

  const [state, setState] = useState(initialState);

 /* eslint-disable no-unused-vars */

  const [options, setOptions] = useState([]); 
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [selectedOptionLO, setSelectedOptionLO] = useState('');
  const[file2,setFile]=useState(null);
  const hsImgUrl = `${servicePath2}/files/${state.headshot}`;


  const getStaff = (aa) => {
    StaffDataService.get(aa)
      .then(response => {
        setState(response.data);
         
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    if (id)
    getStaff(id);
  }, [id]);

  const updateStaff = () => {
   
    const data = new FormData() 
  
    if(file2 !== null)
    data.append("file",file2);
     /* eslint-disable no-restricted-syntax */

    for (const [key, val] of Object.entries(state)) {
      if (key !=='company_id')
      data.append(key, val);
      else if(typeof(val) === 'string')
      data.append(key, val);
      else
      console.log('companycd');
      
    }
    StaffDataService.update(state.id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The Staff was updated successfully!");
        history.push("/app/staffs/staffs-list");
      })
      .catch(e => {
        console.log(e);
      });
  };

  async function fetchData() {
    axios.get(`${apiUrl}`)
      .then(({data}) => {
        const option = data.map((item)=>({
          "value" : item.value,
          "label" : item.label,
      }))
        setOptions(option);
          
      })
      .catch(error => {
        console.error('Companies code error!', error);
      })
     

  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const { messages } = intl;
  
  const eventHandlers = {
    addedfile: (file) => {
     setFile(file);
    }
  }

  

  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.staff-edit-title" match={match} />
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
                    <CardTitle>
                      <IntlMessages id="input-groups.multiple-inputs" />
                    </CardTitle>
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
                    <Card className="mb-4">
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="form-staff-headshot" />
                        </CardTitle> 
                        <Row>
                        <Colxx xxs="12" md="2" className="mb-5">
                        <img src={hsImgUrl} alt="headshotImage"  width="150"/>
                        </Colxx> 
                        <Colxx xxs="12" md="10">  <DropzoneComponent
                        config={dropzoneComponentConfig}
                        djsConfig={dropzoneConfig}
                        eventHandlers ={eventHandlers} multiple={false}/> 
                        </Colxx>
                        </Row>
                        </CardBody>
                    </Card>
}
                    {(currentUser.companyId === '63142fd5b54bdbb18f556016') &&
                <FormGroup>
                  <Label className="mt-4">
                    <IntlMessages id="forms.user-company" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-company"
                    options={options}
                    value={options.find(obj => {
                      return obj.value === state.company_id;
                    })}
                    onChange={(val) => setState({ ...state, company_id: val.value })}
                    
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
                    label={messages['forms.label.eprofile']}
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
                    label={messages['forms.label.vcf']}
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
                <Button color="primary" className="mt-4" onClick={updateStaff}>
                  <IntlMessages id="forms.submit" />
                </Button>
                <p>{message}</p>
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
export default injectIntl(connect(mapStateToProps)  (EditClientModal));
