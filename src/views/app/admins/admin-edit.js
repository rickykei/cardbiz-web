/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { connect } from 'react-redux';
 
import Breadcrumb from 'containers/navs/Breadcrumb';
import Select from 'react-select';
import { injectIntl } from 'react-intl';
import CustomSelectInput from 'components/common/CustomSelectInput';
import {  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, CardTitle, CustomInput } from 'reactstrap';
import axios from 'axios';
import { servicePath2 } from 'constants/defaultValues';
import DropzoneComponent from 'react-dropzone-component';
import CompanyDataService from 'services/CompanyService';
import { useParams, useHistory,NavLink } from "react-router-dom";
import 'dropzone/dist/min/dropzone.min.css';
import UserDataService from 'services/UsersService';
import classnames from 'classnames';

const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = { postUrl: 'no-url', };

const dropzoneConfigLogo = {
  autoProcessQueue: false,
  thumbnailHeight: 160,
  maxFilesize: 1,
  maxFiles: 1,
  resizeWidth: 150,
  resizeHeight: 150,
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

const dropzoneConfigBanner = {
  autoProcessQueue: false,
  thumbnailHeight: 160,
  maxFilesize: 1,
  maxFiles: 1,
  acceptedFiles: ".jpeg,.jpg,.png,.gif",
  uploadMultiple: false,
  resizeWidth: 800,
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

const AdminPage = ({ intl, match,currentUser }) => {
  const initialState = {
    id: null,
    username: "",
    password: "",
    repassword: "",
    email: "",
    company_id: 0,
    companies: [],
    status: true,
  
  };

  const initialUserState = {
    two_factor: false,
    email: "",
  };
  const { id } = useParams();
  const [bannerfile, setBannerFile] = useState(null);
  const [logofile, setLogoFile] = useState(null);
  const [state, setState] = useState(initialState);
  const [userState, setUserState] = useState(initialUserState);
  const [options, setOptions] = useState([]);
  const [selectedOptionLO, setSelectedOptionLO] = useState('');
  const [message, setMessage] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messageTwoFactor, setMessageTwoFactor] = useState("");
  const apiUrl = `${servicePath2}/companies/codelist`;
 
  const CompanyBannerImgUrl = `${servicePath2}/files/${state.banner}`;
  const CompanyLogoImgUrl = `${servicePath2}/files/${state.logo}`;
  const { messages } = intl;
  const eventHandlers = { addedfile: (file) => { setBannerFile(file); } }
  const eventHandlers2 = { addedfile: (file) => { setLogoFile(file); } }
   const history = useHistory();
   const [activeFirstTab, setActiveFirstTab] = useState('1');
   const [activeSecondTab, setActiveSecondTab] = useState('1');
   const downloadStaffLogExcel = `${servicePath2}/staff_logs/downloadStaffLogExcel?company_id=${currentUser.companyId}&uid=${currentUser.uid}`;
   const downloadStaffProfileExcel =`${servicePath2}/profile_counter/downloadStaffLogExcel?company_id=${currentUser.companyId}&uid=${currentUser.uid}`;
   const downloadStaffVcfExcel =`${servicePath2}/vcf_counter/downloadStaffLogExcel?company_id=${currentUser.companyId}&uid=${currentUser.uid}`;
 

  const updateCompany = () => {

    console.log(state.company_id);

    if (state.company_id === undefined)
      state.company_id = selectedOptionLO.value;
    console.log(state.company_id);
    const data = new FormData()

    
    /* eslint-disable no-restricted-syntax */


    for (const [key, val] of Object.entries(state)) {
      if (key!=='banner' && key!=='logo')
      data.append(key, val);
    }
    if (bannerfile !== null)
      data.append("banner", bannerfile);
      if (logofile !== null)
      data.append("logo", logofile);
    CompanyDataService.update(state.id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The company was updated successfully!");
       
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateAdminPassword = () => {

 console.log(state.company_id);

    if (state.password === "" || state.repassword===""|| state.password.length<=3 ||state.repassword.length<=3)
     setMessagePassword("Please enter password correctly");
    else if(state.password !== state.repassword)
     setMessagePassword("Two password is not match");
    else{

        if (state.company_id === undefined)
          state.company_id = selectedOptionLO.value;
        console.log(state.company_id);
        const data = new FormData()
        /* eslint-disable no-restricted-syntax */

        for (const [key, val] of Object.entries(state)) {
          data.append(key, val);
        }
        UserDataService.update(currentUser.uid, state)
          .then(response => {
            console.log(response.data);
            setMessagePassword("Password was updated successfully!");
             
          })
          .catch(e => {
            console.log(e);
          });
        }
  };

  const updateTwoFactor = () => {

    console.log(userState);
  
    
           UserDataService.update(currentUser.uid, userState)
             .then(response => {
               console.log(response.data);
               setMessageTwoFactor("2fa status was updated successfully!");
                
             })
             .catch(e => {
               console.log(e);
             });
            
     };

     const fetchUserRecord = () => {
      
      UserDataService.get(id!==undefined?id:currentUser.uid)
        .then(response => {
          console.log("fetchUserRecord");
          console.log(response.data.email);
          
          setUserState({...userState, two_factor: response.data.two_factor,email: response.data.email});
          
           
        })
        .catch(e => {
          console.log(e);
        });
    };
  const fetchCompanyRecord = () => {
    console.log(currentUser.companyId);
    console.log(id);
    CompanyDataService.get(id!==undefined?id:currentUser.companyId)
      .then(response => {
        setState(response.data);
         
      })
      .catch(e => {
        console.log(e);
      });
  };

  async function fetchCompanyCode() {
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
    fetchUserRecord();
    fetchCompanyRecord();
    fetchCompanyCode();
  
  }, []);
  
  return (
    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.admin-edit" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">


          <Form>
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="input-groups.update-password" />
                </CardTitle>
                <FormGroup>
                  <Label for="work_tel">
                    <IntlMessages id="forms.admin-update-password" />
                  </Label>
                  <Input
                    type="password"
                    value={state.password || ''}
                    onChange={(val) => setState({ ...state, password: val.target.value })}
                    placeholder={messages['forms.admin-update-password']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.admin-password-muted" />
                  </FormText>
                </FormGroup>

                <FormGroup>
                  <Label for="work_tel">
                    <IntlMessages id="forms.admin-re-type-update-password" />
                  </Label>
                  <Input
                    type="password"
                    value={state.repassword || ''}
                    onChange={(val) => setState({ ...state, repassword: val.target.value })}
                    placeholder={messages['forms.admin-update-password']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.admin-password-muted" />
                  </FormText>
                </FormGroup>

                <Button color="primary" className="mt-4" onClick={() => updateAdminPassword()}>
                  <IntlMessages id="forms.submit" />
                </Button>
                <p>{messagePassword}</p>
              </CardBody>
            </Card>

          </Form>
       
        </Colxx>
      </Row>
  <Row className="mb-4">
        <Colxx xxs="12">

  
          <Form>
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="input-groups.update-2fa" />
                </CardTitle>
                <FormGroup>
                  <Label for="work_tel">
                    <IntlMessages id="forms.admin-email" />
                  </Label>
                  <Input
                    type="text"
                    value={userState.email || ''}
                    placeholder={messages['forms.admin-email']}
                    readOnly 
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.admin-email-muted" />
                  </FormText>
                </FormGroup>
       
                 
                  <FormGroup>
                  <Label>
                    <IntlMessages id="forms.admin-two-factor" />
                  </Label>
                  <CustomInput
                    type="radio"
                    id="twofactorOn"
                    name="twofactorOn"
                    label="Active"
                    checked={userState.two_factor === true}
                    onChange={(event) =>
                      setUserState({
                        ...userState,
                        two_factor: event.target.value === 'on',
                      })
                    }
                  />
                
                  <CustomInput
                    type="radio"
                    id="twofactorOff"
                    name="twofactorOff"
                    label="Disable"
                    checked={userState.two_factor === false} 
                    onChange={(event) =>
                      setUserState({
                        ...userState,
                        two_factor: event.target.value !== 'on',
                      })
                    }
                  />
            
                </FormGroup>
                 
               
                <Button color="primary" className="mt-4" onClick={() => updateTwoFactor()}>
                  <IntlMessages id="forms.submit" />
                </Button>
                <p>{messageTwoFactor}</p>
              </CardBody>
            </Card>
          
          </Form>
        
        </Colxx>
      </Row>

      <Row>
      <Colxx xxs="12">
      
        <Row>
          <Colxx xxs="12" >
            <Card className="mb-4">
              <CardHeader>
                <Nav tabs className="card-header-tabs ">
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '1',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('1');
                      }}
                    >
                     <IntlMessages id="cards.tab-admin-log1" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '2',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('2');
                      }}
                    >
                       <IntlMessages id="cards.tab-admin-log2" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      to="#"
                      location={{}}
                      className={classnames({
                        active: activeFirstTab === '3',
                        'nav-link': true,
                      })}
                      onClick={() => {
                        setActiveFirstTab('3');
                      }}
                    >
                       <IntlMessages id="cards.tab-admin-log3" />
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>

              <TabContent activeTab={activeFirstTab}>
                <TabPane tabId="1">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                     
                        <a href={downloadStaffLogExcel}><Button color="primary" className="mt-4" >
                  <IntlMessages id="forms.download_staff_log_excel" />
                </Button></a>
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      
                        <a href={downloadStaffProfileExcel}><Button color="primary" className="mt-4" >
                  <IntlMessages id="forms.download_staff_profile_excel" />
                </Button></a>
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Colxx sm="12">
                      <CardBody>
                      <a href={downloadStaffVcfExcel}><Button color="primary" className="mt-4" >
                  <IntlMessages id="forms.download_staff_vcf_excel" />
                </Button></a>
             
                      </CardBody>
                    </Colxx>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>
          </Colxx>

         
        </Row>
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
                      <IntlMessages id="input-groups.admin-staff-profile" />
                    </CardTitle>
                  <Row>
                    <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="fname">
                        <IntlMessages id="forms.admin-fname" />
                      </Label>
                      <Input
                          type="text"
                          value={state.fname || ''}
                          onChange={(val) => setState({ ...state, fname: val.target.value })}
                          placeholder={messages['forms.admin-firstname']}

                        />
                      <FormText color="muted">
                        <IntlMessages id="forms.admin-firstname-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                    
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="fname">
                        <IntlMessages id="forms.admin-fname" />
                      </Label>
                      <Input
                          type="text"
                          value={state.lname || ''}
                          onChange={(val) => setState({ ...state, lname: val.target.value })}
                          placeholder={messages['forms.staff-lastname']}

                        />
                      <FormText color="muted">
                        <IntlMessages id="forms.admin-firstname-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                  </Row>
                       
                   

                    <FormGroup>
                      <CardTitle>
                        <IntlMessages id="form-company-banner" />
                      </CardTitle>
                      <Row>
                        <Colxx xxs="12" md="2" className="mb-5">
                          <img src={CompanyBannerImgUrl} alt="companyBannerImage" width="150" />
                        </Colxx>
                        <Colxx xxs="12" md="10">  <DropzoneComponent
                          config={dropzoneComponentConfig}
                          djsConfig={dropzoneConfigBanner}
                          eventHandlers={eventHandlers} multiple={false} />
                        </Colxx>
                      </Row>

                    </FormGroup>

                    <FormGroup>

                      <CardTitle>
                        <IntlMessages id="form-company-logo" />
                      </CardTitle>
                      <Row>
                        <Colxx xxs="12" md="2" className="mb-5">
                          <img src={CompanyLogoImgUrl} alt="companyLogoImage"   width="150" />
                        </Colxx>
                        <Colxx xxs="12" md="10">  <DropzoneComponent
                          config={dropzoneComponentConfig}
                          djsConfig={dropzoneConfigLogo}
                          eventHandlers={eventHandlers2} multiple={false} />
                        </Colxx>
                      </Row>

                    </FormGroup>

                    {currentUser.companyId === '63142fd5b54bdbb18f556016' &&
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
                          <Label for="work_email">
                            <IntlMessages id="forms.staff-work_email" />
                          </Label>
                          <Input
                            type="text"
                            value={state.work_mail || ''}
                            onChange={(val) => setState({ ...state, work_mail: val.target.value })}
                            placeholder={messages['forms.staff-work_email']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.hr-work_email-muted" />
                          </FormText>
                        </FormGroup>

                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <FormGroup>
                          <Label for="company-country">
                            <IntlMessages id="forms.company-country" />
                          </Label>
                          <Input
                            type="text"
                            value={state.country || ''}
                            onChange={(val) => setState({ ...state, country: val.target.value })}
                            placeholder={messages['forms.company.country']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.admin-company-country-muted" />
                          </FormText>
                        </FormGroup>
                      </Colxx>
                    </Row>

                    <Row>
                      <Colxx xxs="12" md="6" className="mb-5">
                        <FormGroup>
                          <Label for="company-website">
                            <IntlMessages id="forms.company-website" />
                          </Label>
                          <Input
                            type="text"
                            value={state.website || ''}
                            onChange={(val) => setState({ ...state, website: val.target.value })}
                            placeholder={messages['forms.company-website']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.company-website-muted" />
                          </FormText>
                        </FormGroup>

                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <FormGroup>
                          <Label for="company-position">
                            <IntlMessages id="forms.company-position" />
                          </Label>
                          <Input
                            type="text"
                            value={state.position || ''}
                            onChange={(val) => setState({ ...state, position: val.target.value })}
                            placeholder={messages['forms.company-position']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.company-position-muted" />
                          </FormText>
                        </FormGroup>
                      </Colxx>
                    </Row>

                    <Row>
                      <Colxx xxs="12" md="6" className="mb-5">
                        <FormGroup>
                          <Label for="company-work-tel">
                            <IntlMessages id="forms.company-work-tel" />
                          </Label>
                          <Input
                            type="text"
                            value={state.work_tel || ''}
                            onChange={(val) => setState({ ...state, work_tel: val.target.value })}
                            placeholder={messages['forms.company-work_tel']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.company-work_tel-muted" />
                          </FormText>
                        </FormGroup>

                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <FormGroup>
                          <Label for="company-mobile">
                            <IntlMessages id="forms.company-mobile" />
                          </Label>
                          <Input
                            type="text"
                            value={state.mobile || ''}
                            onChange={(val) => setState({ ...state, mobile: val.target.value })}
                            placeholder={messages['forms.company-mobile']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.company-mobile-muted" />
                          </FormText>
                        </FormGroup>
                      </Colxx>
                    </Row>

                    <FormGroup>
                      <Label for="address">
                        <IntlMessages id="forms.admin-company-address" />
                      </Label>
                      <Input
                        type="input"
                        value={state.address || ''}
                        onChange={(val) => setState({ ...state, address: val.target.value })}
                        placeholder={messages['forms.admin-company-address']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.admin-company-address-muted" />
                      </FormText>
                    </FormGroup>

                    <Row>
                      <Colxx xxs="12" md="6" className="mb-5">
                        <FormGroup>
                          <Label for="company-sub-division">
                            <IntlMessages id="forms.company-sub-division" />
                          </Label>
                          <Input
                            type="text"
                            value={state.sub_division || ''}
                            onChange={(val) => setState({ ...state, sub_division: val.target.value })}
                            placeholder={messages['forms.company.sub_division']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.company-sub_division-muted" />
                          </FormText>
                        </FormGroup>

                      </Colxx>
                      <Colxx xxs="12" md="6">
                        <FormGroup>
                          <Label for="company-department">
                            <IntlMessages id="forms.company-department" />
                          </Label>
                          <Input
                            type="text"
                            value={state.department || ''}
                            onChange={(val) => setState({ ...state, department: val.target.value })}
                            placeholder={messages['forms.company.department']}

                          />
                          <FormText color="muted">
                            <IntlMessages id="forms.company-department-muted" />
                          </FormText>
                        </FormGroup>
                      </Colxx>
                    </Row>
                    <Button color="primary" className="mt-4" onClick={() => updateCompany()}>
                      <IntlMessages id="forms.submit" />
                    </Button>
                    <p>{message}</p>
                  </CardBody>
                </Card>

              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

    </>
  );
};

const mapStateToProps = ({ menu,authUser, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  const { currentUser } = authUser;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
    currentUser,
  };
};
export default injectIntl(connect(mapStateToProps)(AdminPage));


