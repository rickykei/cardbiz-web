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
import { servicePath2 ,qrcodeSelectData,companyNameSelectData} from 'constants/defaultValues';
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
    company_id: "",
    company_name_option:"",
    rc_no: "",
    staff_no: "", 
    company_name_chi: "", 
    company_name_eng: "", 
    company_name_chi2: "", 
    company_name_eng2: "", 
    company_name_chi3: "", 
    company_name_eng3: "", 
    fname: "", 
    lname: "", 
      cc_no: "", 
      title_eng: "", 
      title_chi: "", 
      title_eng2: "", 
      title_chi2: "", 
      pro_title: "", 
      division_eng: "", 
      division_chi: "", 
      dept_eng: "", 
      dept_chi: "", 
      address_eng: "", 
      address_chi: "", 
      address_eng2: "", 
      address_chi2: "", 
      work_tel: "", 
      work_tel2: "", 
      work_tel3: "", 
      direct_tel: "", 
      
      mobile: "", 
      mobile2: "", 
      mobile3: "", 
      mobile_china_tel: "", 
      mobile_china_tel2: "", 
      mobile_china_tel3: "", 
      fax: "", 
      swift_no: "", 
      work_email: "", 
      work_email2: "", 
      work_email3: "", 
      web_link: "", 
      web_link2: "", 
      web_link3: "", 
    
      agent_no: "", 
      insurance_no: "", 
      mpf_no: "", 
      hkma_no: "", 
      type1_no: false, 
      type4_no: false,
      type6_no: false,
      type9_no: false, 
      reuters_code: "", 
      bloomberg_info: "",  
      sfc_no: "", 
      sfc_type1_no: false,
      sfc_type2_no: false,
      field051: "", 
      field052: "", 
      field053: "", 
      field054: "", 
      field055: "", 
      field056: "", 
      field057: "", 
      field058: "", 
      field059: "", 
      field060: "", 
      field061: "", 
      field062: "", 
      field063: "", 
      field064: "", 
      field065: "", 
      field066: "", 
      field067: "", 
      field068: "", 
      field069: "", 
      field070: "",  
      field071: "",
      field072: "",  
      field073: "", 
      smartcard_uid: "",
      bizcard_option: true,
      dig_card_in_vcf:true,
      note_timestamp: false,
      note: "",
      updated_by: "630cf0461fa3f166eb3dee01",
      created_by: "630cf0461fa3f166eb3dee01",
      status: true, 
      qrcode_option: 1,
     
  };
  const apiUrl = `${servicePath2}/companies/codelist`;
  const apiUrlSmartCard = `${servicePath2}/smartcards/findByCompanyIdPullDown?companyId=${currentUser.companyId}&staffId=${id}`;
  const [state, setState] = useState(initialState);

 /* eslint-disable no-unused-vars */

  const [options, setOptions] = useState([]); 
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [selectedOptionLO, setSelectedOptionLO] = useState('');
  const[file2,setFile]=useState(null);
  const hsImgUrl = `${servicePath2}/files/${state.headshot}`;
  const [smartIdSelectData,setSmartIdSelectData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  

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

  const updateStaff = (e) => {
    setIsDisabled(true);  
    e.preventDefault();
    const data = new FormData() 
  
    if(file2 !== null)
    data.append("file",file2);
     /* eslint-disable no-restricted-syntax */
     data.append("uid",currentUser.uid);
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
        setIsDisabled(false); // <--- here
        history.push("/app/staffs/staffs-list");
      })
      .catch(a=>{
        setIsDisabled(false); // <--- here
        console.log(a);
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
  
  async function fetchSmartCardData() {
    axios.get(`${apiUrlSmartCard}`)
      .then(({data}) => {
        const option = data.map((item)=>({
          "value" : item.value,
          "label" : item.label,
      }))
      setSmartIdSelectData(option);
          
      })
      .catch(error => {
        console.error('Smart Card Uid Get error!', error);
      })
  }

  useEffect(() => {
    fetchData();
    fetchSmartCardData();
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
      <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="cc_no">
                        <IntlMessages id="forms.staff-cc_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.cc_no || ''}
                        onChange={(val) => setState({ ...state, cc_no: val.target.value })}
                        placeholder={messages['forms.staff-cc_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-cc_no-muted" />
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
                          <Label for="fname">
                            <IntlMessages id="forms.staff-fname" />
                          </Label>
                          <Input
                            type="text"
                            value={state.fname || ''}
                            onChange={(val) => setState({ ...state, fname: val.target.value })}
                            placeholder={messages['forms.staff-fname']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.staff-fname-muted" />
                          </FormText>
                        </FormGroup>

                      </Colxx>
                      <Colxx xxs="12" md="6">


                        <FormGroup>
                          <Label for="lname">
                            <IntlMessages id="forms.staff-lname" />
                          </Label>
                          <Input
                            type="text"
                            value={state.lname || ''}
                            onChange={(val) => setState({ ...state, lname: val.target.value })}
                            placeholder={messages['forms.staff-lname']}
                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.staff-lname-muted" />
                          </FormText>
                        </FormGroup>
                      </Colxx>
                   </Row>
 <Row>
                  <Colxx xxs="12" md="6" className="mb-5" >
                  <FormGroup>
                      <Label for="field066">
                        <IntlMessages id="forms.staff-field066" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field066 || ''}
                        onChange={(val) => setState({ ...state, field066: val.target.value })}
                        placeholder={messages['forms.staff-field066']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field066-muted" />
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
                      <Label for="field071">
                        <IntlMessages id="forms.staff-field071" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field071 || ''}
                        onChange={(val) => setState({ ...state, field071: val.target.value })}
                        placeholder={messages['forms.staff-field071']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field071-muted" />
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


                
               <FormGroup>
                  <Label>
                    <IntlMessages id="forms.staff-company_name_option" />
                  </Label>
                   
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-company_name_option" 
                    options={companyNameSelectData}
                     value={companyNameSelectData.find(obj => {
                      return obj.value === state.company_name_option;
                    })}
                    onChange={(val) => setState({ ...state, company_name_option: val.value })}
                   
                  />

                </FormGroup>
                 
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
                      <Label for="title_eng2">
                        <IntlMessages id="forms.staff-title_eng2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.title_eng2 || ''}
                        onChange={(val) => setState({ ...state, title_eng2: val.target.value })}
                        placeholder={messages['forms.staff-title_eng2']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-title_eng2-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6"> 
                    <FormGroup>
                      <Label for="title_chi2">
                        <IntlMessages id="forms.staff-title_chi2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.title_chi2 || ''}
                        onChange={(val) => setState({ ...state, title_chi2: val.target.value })}
                        placeholder={messages['forms.staff-title_chi2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-title_chi2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="dept_eng">
                        <IntlMessages id="forms.staff-dept_eng" />
                      </Label>
                      <Input
                        type="text"
                        value={state.dept_eng || ''}
                        onChange={(val) => setState({ ...state, dept_eng: val.target.value })}
                        placeholder={messages['forms.staff-dept_eng']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-dept_eng-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="dept_chi">
                        <IntlMessages id="forms.staff-dept_chi" />
                      </Label>
                      <Input
                        type="text"
                        value={state.dept_chi || ''}
                        onChange={(val) => setState({ ...state, dept_chi: val.target.value })}
                        placeholder={messages['forms.staff-dept_chi']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-dept_chi-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="division_eng">
                        <IntlMessages id="forms.staff-division_eng" />
                      </Label>
                      <Input
                        type="text"
                        value={state.division_eng || ''}
                        onChange={(val) => setState({ ...state, division_eng: val.target.value })}
                        placeholder={messages['forms.staff-division_eng']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-division_eng-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                    <FormGroup>
                      <Label for="division_chi">
                        <IntlMessages id="forms.staff-division_chi" />
                      </Label>
                      <Input
                        type="text"
                        value={state.division_chi || ''}
                        onChange={(val) => setState({ ...state, division_chi: val.target.value })}
                        placeholder={messages['forms.staff-division_chi']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-division_chi-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="company_name_eng2">
                        <IntlMessages id="forms.staff-company_name_eng2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.company_name_eng2 || ''}
                        onChange={(val) => setState({ ...state, company_name_eng2: val.target.value })}
                        placeholder={messages['forms.staff-company_name_eng2']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-company_name_eng2-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="company_name_chi2">
                        <IntlMessages id="forms.staff-company_name_chi2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.company_name_chi2 || ''}
                        onChange={(val) => setState({ ...state, company_name_chi2: val.target.value })}
                        placeholder={messages['forms.staff-company_name_chi2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-company_name_chi2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
 <Row>
                <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="field072">
                        <IntlMessages id="forms.staff-field072" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field072 || ''}
                        onChange={(val) => setState({ ...state, field072: val.target.value })}
                        placeholder={messages['forms.staff-field072']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field072-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="field073">
                        <IntlMessages id="forms.staff-field073" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field073 || ''}
                        onChange={(val) => setState({ ...state, field073: val.target.value })}
                        placeholder={messages['forms.staff-field073']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field073-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
               
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="company_name_eng3">
                        <IntlMessages id="forms.staff-company_name_eng3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.company_name_eng3 || ''}
                        onChange={(val) => setState({ ...state, company_name_eng3: val.target.value })}
                        placeholder={messages['forms.staff-company_name_eng3']}

                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-company_name_eng3-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">


                    <FormGroup>
                      <Label for="company_name_chi3">
                        <IntlMessages id="forms.staff-company_name_chi3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.company_name_chi3 || ''}
                        onChange={(val) => setState({ ...state, company_name_chi3: val.target.value })}
                        placeholder={messages['forms.staff-company_name_chi3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-company_name_chi3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
<Row>
                             <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="field069">
                        <IntlMessages id="forms.staff-field069" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field069 || ''}
                        onChange={(val) => setState({ ...state, field069: val.target.value })}
                        placeholder={messages['forms.staff-field069']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field069-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="field070">
                        <IntlMessages id="forms.staff-field070" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field070 || ''}
                        onChange={(val) => setState({ ...state, field070: val.target.value })}
                        placeholder={messages['forms.staff-field070']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field070-muted" />
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
                </Row>
   <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.staff-type1_no" />
                    </Label>
                    <CustomInput
                      type="radio"
                      id="exCustomRadio-1-type1_no"
                      name="customRadio-1-type1_no"
                      label="Yes"
                      checked={state.type1_no === true}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type1_no: event.target.value === 'on',
                        })
                      }
                    />


                    <CustomInput
                      type="radio"
                      id="exCustomRadio-2-type1_no"
                      name="customRadio-2-type1_no"
                      label="No"
                      checked={state.type1_no === false}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type1_no: event.target.value !== 'on',
                        })
                      }
                    /> 
                  </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.staff-type4_no" />
                    </Label>
                    <CustomInput
                      type="radio"
                      id="exCustomRadio-1-type4_no"
                      name="customRadio-1-type4_no"
                      label="Yes"
                      checked={state.type4_no === true}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type4_no: event.target.value === 'on',
                        })
                      }
                    />


                    <CustomInput
                      type="radio"
                      id="exCustomRadio-2-type4_no"
                      name="customRadio-2-type4_no"
                      label="No"
                      checked={state.type4_no === false}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type4_no: event.target.value !== 'on',
                        })
                      }
                    /> 
                  </FormGroup>
                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.staff-type6_no" />
                    </Label>
                    <CustomInput
                      type="radio"
                      id="exCustomRadio-1-type6_no"
                      name="customRadio-1-type6_no"
                      label="Yes"
                      checked={state.type6_no === true}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type6_no: event.target.value === 'on',
                        })
                      }
                    />


                    <CustomInput
                      type="radio"
                      id="exCustomRadio-2-type6_no"
                      name="customRadio-2-type6_no"
                      label="No"
                      checked={state.type6_no === false}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type6_no: event.target.value !== 'on',
                        })
                      }
                    /> 
                  </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.staff-type9_no" />
                    </Label>
                    <CustomInput
                      type="radio"
                      id="exCustomRadio-1-type9_no"
                      name="customRadio-1-type9_no"
                      label="Yes"
                      checked={state.type9_no === true}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type9_no: event.target.value === 'on',
                        })
                      }
                    />


                    <CustomInput
                      type="radio"
                      id="exCustomRadio-2-type9_no"
                      name="customRadio-2-type9_no"
                      label="No"
                      checked={state.type9_no === false}
                      onChange={(event) =>
                        setState({
                          ...state,
                          type9_no: event.target.value !== 'on',
                        })
                      }
                    /> 
                  </FormGroup>
                  </Colxx>
                </Row>
 <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="field056">
                        <IntlMessages id="forms.staff-field056" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field056 || ''}
                        onChange={(val) => setState({ ...state, field056: val.target.value })}
                        placeholder={messages['forms.staff-field056']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field056-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="field057">
                        <IntlMessages id="forms.staff-field057" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field057 || ''}
                        onChange={(val) => setState({ ...state, field057: val.target.value })}
                        placeholder={messages['forms.staff-field057']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field057-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="field058">
                        <IntlMessages id="forms.staff-field058" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field058 || ''}
                        onChange={(val) => setState({ ...state, field058: val.target.value })}
                        placeholder={messages['forms.staff-field058']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field058-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
                </Row>
 <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
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
                      <Label for="insurance_no">
                        <IntlMessages id="forms.staff-insurance_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.insurance_no || ''}
                        onChange={(val) => setState({ ...state, insurance_no: val.target.value })}
                        placeholder={messages['forms.staff-insurance_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-insurance_no-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>
 <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="sfc_no">
                        <IntlMessages id="forms.staff-sfc_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.sfc_no || ''}
                        onChange={(val) => setState({ ...state, sfc_no: val.target.value })}
                        placeholder={messages['forms.staff-sfc_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-sfc_no-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
</Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                    <Label>
                      <IntlMessages id="forms.staff-sfc_type1_no" />
                    </Label>
                    <CustomInput
                      type="radio"
                      id="exCustomRadio-1-sfc_type1_no"
                      name="customRadio-1-sfc_type1_no"
                      label="Yes"
                      checked={state.sfc_type1_no === true}
                      onChange={(event) =>
                        setState({
                          ...state,
                          sfc_type1_no: event.target.value === 'on',
                        })
                      }
                    />


                    <CustomInput
                      type="radio"
                      id="exCustomRadio-2-sfc_type1_no"
                      name="customRadio-2-sfc_type1_no"
                      label="No"
                      checked={state.sfc_type1_no === false}
                      onChange={(event) =>
                        setState({
                          ...state,
                          sfc_type1_no: event.target.value !== 'on',
                        })
                      }
                    /> 
                  </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                <Label>
                  <IntlMessages id="forms.staff-sfc_type2_no" />
                </Label>
                <CustomInput
                  type="radio"
                  id="exCustomRadio-1-sfc_type2_no"
                  name="customRadio-1-sfc_type2_no"
                  label="Yes"
                  checked={state.sfc_type2_no === true}
                  onChange={(event) =>
                    setState({
                      ...state,
                      sfc_type2_no: event.target.value === 'on',
                    })
                  }
                />


                <CustomInput
                  type="radio"
                  id="exCustomRadio-2-sfc_type2_no"
                  name="customRadio-2-sfc_type2_no"
                  label="No"
                  checked={state.sfc_type2_no === false}
                  onChange={(event) =>
                    setState({
                      ...state,
                      sfc_type2_no: event.target.value !== 'on',
                    })
                  }
                />


              </FormGroup>
                     
                  </Colxx>
</Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="field059">
                        <IntlMessages id="forms.staff-field059" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field059 || ''}
                        onChange={(val) => setState({ ...state, field059: val.target.value })}
                        placeholder={messages['forms.staff-field059']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field059-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="field060">
                        <IntlMessages id="forms.staff-field060" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field060 || ''}
                        onChange={(val) => setState({ ...state, field060: val.target.value })}
                        placeholder={messages['forms.staff-field060']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field060-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
</Row>
 <Row>
                            <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="bloomberg_info">
                        <IntlMessages id="forms.staff-bloomberg_info" />
                      </Label>
                      <Input
                        type="text"
                        value={state.bloomberg_info || ''}
                        onChange={(val) => setState({ ...state, bloomberg_info: val.target.value })}
                        placeholder={messages['forms.staff-bloomberg_info']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-bloomberg_info-muted" />
                      </FormText>
                    </FormGroup>
                   

                  </Colxx>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="reuters_code">
                        <IntlMessages id="forms.staff-reuters_code" />
                      </Label>
                      <Input
                        type="text"
                        value={state.reuters_code || ''}
                        onChange={(val) => setState({ ...state, reuters_code: val.target.value })}
                        placeholder={messages['forms.staff-reuters_code']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-reuters_code-muted" />
                      </FormText>
                    </FormGroup>
                    
                  </Colxx>
                  
                </Row>
<Row>
                             <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="field052">
                        <IntlMessages id="forms.staff-field052" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field052 || ''}
                        onChange={(val) => setState({ ...state, field052: val.target.value })}
                        placeholder={messages['forms.staff-field052']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field052-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
 <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="field051">
                        <IntlMessages id="forms.staff-field051" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field051 || ''}
                        onChange={(val) => setState({ ...state, field051: val.target.value })}
                        placeholder={messages['forms.staff-field051']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field051-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                 
</Row>
   <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="field054">
                        <IntlMessages id="forms.staff-field054" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field054 || ''}
                        onChange={(val) => setState({ ...state, field054: val.target.value })}
                        placeholder={messages['forms.staff-field054']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field054-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="field055">
                        <IntlMessages id="forms.staff-field055" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field055 || ''}
                        onChange={(val) => setState({ ...state, field055: val.target.value })}
                        placeholder={messages['forms.staff-field055']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field055-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="field053">
                        <IntlMessages id="forms.staff-field053" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field053 || ''}
                        onChange={(val) => setState({ ...state, field053: val.target.value })}
                        placeholder={messages['forms.staff-field053']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field053-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>
             <Row>
                             <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="field061">
                        <IntlMessages id="forms.staff-field061" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field061 || ''}
                        onChange={(val) => setState({ ...state, field061: val.target.value })}
                        placeholder={messages['forms.staff-field061']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field061-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="field062">
                        <IntlMessages id="forms.staff-field062" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field062 || ''}
                        onChange={(val) => setState({ ...state, field062: val.target.value })}
                        placeholder={messages['forms.staff-field062']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field062-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
</Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="field063">
                        <IntlMessages id="forms.staff-field063" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field063 || ''}
                        onChange={(val) => setState({ ...state, field063: val.target.value })}
                        placeholder={messages['forms.staff-field063']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field063-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  <Colxx xxs="12" md="6">
                  <FormGroup>
                      <Label for="field064">
                        <IntlMessages id="forms.staff-field064" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field064 || ''}
                        onChange={(val) => setState({ ...state, field064: val.target.value })}
                        placeholder={messages['forms.staff-field064']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field064-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
</Row>
<Row>
                              <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="swift_no">
                        <IntlMessages id="forms.staff-swift_no" />
                      </Label>
                      <Input
                        type="text"
                        value={state.swift_no || ''}
                        onChange={(val) => setState({ ...state, swift_no: val.target.value })}
                        placeholder={messages['forms.staff-swift_no']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-swift_no-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
 <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="field065">
                        <IntlMessages id="forms.staff-field065" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field065 || ''}
                        onChange={(val) => setState({ ...state, field065: val.target.value })}
                        placeholder={messages['forms.staff-field065']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field065-muted" />
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
                      <Label for="work_tel2">
                        <IntlMessages id="forms.staff-work_tel2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.work_tel2 || ''}
                        onChange={(val) => setState({ ...state, work_tel2: val.target.value })}
                        placeholder={messages['forms.staff-work_tel2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_tel2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="work_tel3">
                        <IntlMessages id="forms.staff-work_tel3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.work_tel3 || ''}
                        onChange={(val) => setState({ ...state, work_tel3: val.target.value })}
                        placeholder={messages['forms.staff-work_tel3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_tel3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
</Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
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
                      <Label for="mobile">
                        <IntlMessages id="forms.staff-mobile" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mobile || ''}
                        onChange={(val) => setState({ ...state, mobile: val.target.value })}
                        placeholder={messages['forms.staff-mobile']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="mobile2">
                        <IntlMessages id="forms.staff-mobile2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mobile2 || ''}
                        onChange={(val) => setState({ ...state, mobile2: val.target.value })}
                        placeholder={messages['forms.staff-mobile2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="mobile3">
                        <IntlMessages id="forms.staff-mobile3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mobile3 || ''}
                        onChange={(val) => setState({ ...state, mobile3: val.target.value })}
                        placeholder={messages['forms.staff-mobile3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
</Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="mobile_china_tel">
                        <IntlMessages id="forms.staff-mobile_china_tel" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mobile_china_tel || ''}
                        onChange={(val) => setState({ ...state, mobile_china_tel: val.target.value })}
                        placeholder={messages['forms.staff-mobile_china_tel']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile_china_tel-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
 <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="mobile_china_tel2">
                        <IntlMessages id="forms.staff-mobile_china_tel2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mobile_china_tel2 || ''}
                        onChange={(val) => setState({ ...state, mobile_china_tel2: val.target.value })}
                        placeholder={messages['forms.staff-mobile_china_tel2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile_china_tel2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="mobile_china_tel3">
                        <IntlMessages id="forms.staff-mobile_china_tel3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.mobile_china_tel3 || ''}
                        onChange={(val) => setState({ ...state, mobile_china_tel3: val.target.value })}
                        placeholder={messages['forms.staff-mobile_china_tel3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-mobile_china_tel3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
<Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                      <Label for="field068">
                        <IntlMessages id="forms.staff-field068" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field068 || ''}
                        onChange={(val) => setState({ ...state, field068: val.target.value })}
                        placeholder={messages['forms.staff-field068']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field068-muted" />
                      </FormText>
                    </FormGroup>
                     
                  </Colxx>
</Row>
 <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
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
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="work_email2">
                        <IntlMessages id="forms.staff-work_email2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.work_email2 || ''}
                        onChange={(val) => setState({ ...state, work_email2: val.target.value })}
                        placeholder={messages['forms.staff-work_email2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_email2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

               

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="work_email3">
                        <IntlMessages id="forms.staff-work_email3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.work_email3 || ''}
                        onChange={(val) => setState({ ...state, work_email3: val.target.value })}
                        placeholder={messages['forms.staff-work_email3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-work_email3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  
                </Row>
 <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="fax">
                        <IntlMessages id="forms.staff-fax" />
                      </Label>
                      <Input
                        type="text"
                        value={state.fax || ''}
                        onChange={(val) => setState({ ...state, fax: val.target.value })}
                        placeholder={messages['forms.staff-fax']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-fax-muted" />
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
                      <Label for="address_eng2">
                        <IntlMessages id="forms.staff-address_eng2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.address_eng2 || ''}
                        onChange={(val) => setState({ ...state, address_eng2: val.target.value })}
                        placeholder={messages['forms.staff-address_eng2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address_eng2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                    <FormGroup>
                      <Label for="address_chi2">
                        <IntlMessages id="forms.staff-address_chi2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.address_chi2 || ''}
                        onChange={(val) => setState({ ...state, address_chi2: val.target.value })}
                        placeholder={messages['forms.staff-address_chi2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address_chi2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>
                    <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="web_link">
                        <IntlMessages id="forms.staff-web_link" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link || ''}
                        onChange={(val) => setState({ ...state, web_link: val.target.value })}
                        placeholder={messages['forms.staff-web_link']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                 <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="web_link2">
                        <IntlMessages id="forms.staff-web_link2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link2 || ''}
                        onChange={(val) => setState({ ...state, web_link2: val.target.value })}
                        placeholder={messages['forms.staff-web_link2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="web_link3">
                        <IntlMessages id="forms.staff-web_link3" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link3 || ''}
                        onChange={(val) => setState({ ...state, web_link3: val.target.value })}
                        placeholder={messages['forms.staff-web_link3']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link3-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                 
                </Row>
<Row>
  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="field067">
                        <IntlMessages id="forms.staff-field067" />
                      </Label>
                      <Input
                        type="text"
                        value={state.field067 || ''}
                        onChange={(val) => setState({ ...state, field067: val.target.value })}
                        placeholder={messages['forms.staff-field067']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-field067-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>
               

                
                <Row>
                      <Colxx xxs="12" md="6" className="mb-5">
                 
                  <FormGroup>
                  <Label>
                    <IntlMessages id="forms.staff-qrcode_option" />
                  </Label>
                   
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-qrcode_option" 
                    options={qrcodeSelectData}
                     value={qrcodeSelectData.find(obj => {
                      return obj.value === state.qrcode_option;
                    })}
                    onChange={(val) => setState({ ...state, qrcode_option: val.value })}
                   
                  />

                </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6" className="mb-5">
                  <FormGroup>
                  <Label for="smartcard_uid">
                        <IntlMessages id="forms.staff-smartcard_uid" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-smartcard_uid" 
                    options={smartIdSelectData}
                     value={smartIdSelectData.find(obj => {
                      return obj.value === state.smartcard_uid;
                    })}
                    onChange={(val) => setState({ ...state, smartcard_uid: val.value })}
                   
                  />
                 
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
    <Button color="primary" className="mt-4" onClick={(e) => updateStaff(e)} disabled={isDisabled}>
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
