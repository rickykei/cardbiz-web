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
    fname: "",
    lname: "",
    company_id: 0,
    companies: [],
    headshot: "",
    work_email: "",
    home_email: "",
    other_email: "",
    position: "",
    work_tel: "",
    work_tel2: "",
    mobile: "",
    mobile2: "",
    home_tel: "",
    fax: "",
    web_link: "",
    web_link2: "",
    web_link3: "",
    web_link4: "",
    web_link5: "",
    web_link6: "",
    address: "",
    address2: "",
    division: "",
    department: "",
    country: "",
    bio: "",
    company_website_url: "",
    more_info_tab_url: "",
    facebook_url: "",
    instagram_url: "",
    whatsapp_url: "",
    linkedin_url: "",
    youtube_url: "",
    twitter_url: "",
    wechat_id: "",
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
      fname: state.fname,
      lname: state.lname,
      company_id: selectedOptionLO.value,
      headshot: state.headshot,
      work_email: state.work_email,
      home_email: state.home_email,
      other_email: state.other_email,
      position: state.position,
      work_tel: state.work_tel,
      work_tel2: state.work_tel2,
      mobile: state.mobile,
      mobile2: state.mobile2,
      home_tel: state.home_tel,
      fax: state.fax,
      web_link: state.web_link,
      web_link2: state.web_link2,
      web_link3: state.web_link3,
      web_link4: state.web_link4,
      web_link5: state.web_link5,
      web_link6: state.web_link6,
      address: state.address,
      address2: state.address2,
      division: state.division,
      department: state.department,
      country: state.country,
      bio: state.bio,
      company_website_url: state.company_website_url,
      more_info_tab_url: state.more_info_tab_url,
      facebook_url: state.facebook_url,
      instagram_url: state.instagram_url,
      whatsapp_url: state.whatsapp_url,
      linkedin_url: state.linkedin_url,
      youtube_url: state.youtube_url,
      twitter_url: state.twitter_url,
      wechat_id: state.wechat_id,
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
                    <CardTitle>
                      <IntlMessages id="input-groups.multiple-inputs" />
                    </CardTitle>
                    <Input
                      type="text"
                      value={state.fname || ''}
                      onChange={(val) => setState({ ...state, fname: val.target.value })}
                      placeholder={messages['forms.staff-firstname']}

                    />

                  </CardBody>
                </Card>

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
                </Row>  
                {(currentUser.companyId === '63142fd5b54bdbb18f556016') &&
                  <FormGroup>
                    <Label className="mt-4">
                      <IntlMessages id="forms.user-company" />  {currentUser.companyId}
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
                      <Label for="home_email">
                        <IntlMessages id="forms.staff-home_email" />
                      </Label>
                      <Input
                        type="text"
                        value={state.home_email || ''}
                        onChange={(val) => setState({ ...state, home_email: val.target.value })}
                        placeholder={messages['forms.staff-home_email']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-home_email-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="other_email">
                        <IntlMessages id="forms.staff-other_email" />
                      </Label>
                      <Input
                        type="text"
                        value={state.other_email || ''}
                        onChange={(val) => setState({ ...state, other_email: val.target.value })}
                        placeholder={messages['forms.staff-other_email']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-other_email-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                    <FormGroup>
                      <Label for="position">
                        <IntlMessages id="forms.staff-position" />
                      </Label>
                      <Input
                        type="text"
                        value={state.position || ''}
                        onChange={(val) => setState({ ...state, position: val.target.value })}
                        placeholder={messages['forms.staff-position']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-position-muted" />
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
                      <Label for="home_tel">
                        <IntlMessages id="forms.staff-home_tel" />
                      </Label>
                      <Input
                        type="text"
                        value={state.home_tel || ''}
                        onChange={(val) => setState({ ...state, home_tel: val.target.value })}
                        placeholder={messages['forms.staff-home_tel']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-home_tel-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

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
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="web_link4">
                        <IntlMessages id="forms.staff-web_link4" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link4 || ''}
                        onChange={(val) => setState({ ...state, web_link4: val.target.value })}
                        placeholder={messages['forms.staff-web_link4']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link4-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="web_link5">
                        <IntlMessages id="forms.staff-web_link5" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link5 || ''}
                        onChange={(val) => setState({ ...state, web_link5: val.target.value })}
                        placeholder={messages['forms.staff-web_link5']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link5-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="web_link6">
                        <IntlMessages id="forms.staff-web_link6" />
                      </Label>
                      <Input
                        type="text"
                        value={state.web_link6 || ''}
                        onChange={(val) => setState({ ...state, web_link6: val.target.value })}
                        placeholder={messages['forms.staff-web_link6']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-web_link6-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="address">
                        <IntlMessages id="forms.staff-address" />
                      </Label>
                      <Input
                        type="text"
                        value={state.address || ''}
                        onChange={(val) => setState({ ...state, address: val.target.value })}
                        placeholder={messages['forms.staff-address']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="address2">
                        <IntlMessages id="forms.staff-address2" />
                      </Label>
                      <Input
                        type="text"
                        value={state.address2 || ''}
                        onChange={(val) => setState({ ...state, address2: val.target.value })}
                        placeholder={messages['forms.staff-address2']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-address2-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="division">
                        <IntlMessages id="forms.staff-division" />
                      </Label>
                      <Input
                        type="text"
                        value={state.division || ''}
                        onChange={(val) => setState({ ...state, division: val.target.value })}
                        placeholder={messages['forms.staff-division']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-division-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="department">
                        <IntlMessages id="forms.staff-department" />
                      </Label>
                      <Input
                        type="text"
                        value={state.department || ''}
                        onChange={(val) => setState({ ...state, department: val.target.value })}
                        placeholder={messages['forms.staff-department']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-department-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="country">
                        <IntlMessages id="forms.staff-country" />
                      </Label>
                      <Input
                        type="text"
                        value={state.country || ''}
                        onChange={(val) => setState({ ...state, country: val.target.value })}
                        placeholder={messages['forms.staff-country']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-country-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="bio">
                        <IntlMessages id="forms.staff-bio" />
                      </Label>
                      <Input
                        type="text"
                        value={state.bio || ''}
                        onChange={(val) => setState({ ...state, bio: val.target.value })}
                        placeholder={messages['forms.staff-bio']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-bio-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="company_website_url">
                        <IntlMessages id="forms.staff-company_website_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.company_website_url || ''}
                        onChange={(val) => setState({ ...state, company_website_url: val.target.value })}
                        placeholder={messages['forms.staff-company_website_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-company_website_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">

                    <FormGroup>
                      <Label for="more_info_tab_url">
                        <IntlMessages id="forms.staff-more_info_tab_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.more_info_tab_url || ''}
                        onChange={(val) => setState({ ...state, more_info_tab_url: val.target.value })}
                        placeholder={messages['forms.staff-more_info_tab_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-more_info_tab_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="facebook_url">
                        <IntlMessages id="forms.staff-facebook_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.facebook_url || ''}
                        onChange={(val) => setState({ ...state, facebook_url: val.target.value })}
                        placeholder={messages['forms.staff-facebook_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-facebook_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="instagram_url">
                        <IntlMessages id="forms.staff-instagram_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.instagram_url || ''}
                        onChange={(val) => setState({ ...state, instagram_url: val.target.value })}
                        placeholder={messages['forms.staff-instagram_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-instagram_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="twitter_url">
                        <IntlMessages id="forms.staff-twitter_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.twitter_url || ''}
                        onChange={(val) => setState({ ...state, twitter_url: val.target.value })}
                        placeholder={messages['forms.staff-twitter_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-twitter_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="whatsapp_url">
                        <IntlMessages id="forms.staff-whatsapp_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.whatsapp_url || ''}
                        onChange={(val) => setState({ ...state, whatsapp_url: val.target.value })}
                        placeholder={messages['forms.staff-whatsapp_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-whatsapp_url-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="linkedin_url">
                        <IntlMessages id="forms.staff-linkedin_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.linkedin_url || ''}
                        onChange={(val) => setState({ ...state, linkedin_url: val.target.value })}
                        placeholder={messages['forms.staff-linkedin_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-linkedin_url-muted" />
                      </FormText>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="12" md="6">
                    <FormGroup>
                      <Label for="youtube_url">
                        <IntlMessages id="forms.staff-youtube_url" />
                      </Label>
                      <Input
                        type="text"
                        value={state.youtube_url || ''}
                        onChange={(val) => setState({ ...state, youtube_url: val.target.value })}
                        placeholder={messages['forms.staff-youtube_url']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-youtube_url-muted" />
                      </FormText>
                    </FormGroup>

                  </Colxx>
                </Row>


                <Row>
                  <Colxx xxs="12" md="6" className="mb-5">
                    <FormGroup>
                      <Label for="wechat_id">
                        <IntlMessages id="forms.staff-wechat_id" />
                      </Label>
                      <Input
                        type="text"
                        value={state.wechat_id || ''}
                        onChange={(val) => setState({ ...state, wechat_id: val.target.value })}
                        placeholder={messages['forms.staff-wechat_id']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="forms.staff-wechat_id-muted" />
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
