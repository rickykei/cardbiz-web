/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
 
import Breadcrumb from 'containers/navs/Breadcrumb';
import { injectIntl } from 'react-intl';
import { Row, Card, CardBody, Input, FormGroup, Label, Button, FormText, Form, CardTitle } from 'reactstrap';
import { servicePath2,fontfamilySelectData } from 'constants/defaultValues';
import DropzoneComponent from 'react-dropzone-component';
import { useParams, useHistory } from "react-router-dom";
import 'dropzone/dist/min/dropzone.min.css';
import CompanyService from 'services/CompanyService';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

const ReactDOMServer = require('react-dom/server');

const EditClientModal = ({ intl, match, }) => {

  const { id } = useParams();
  const initialState = {
    id: null,
    name: "",
    font_color: "",
    font_size: "",
    font_family:"",
    bg_color: "",
    text_color:"",
    title_text_color:"",
    social_icon_bg_color:"",
    button_color:"",
    links_hover_color:"",
    links_not_hover_color:"",
    links_selected_color:"",
    left_nav_bar_color:"",
    bio_wording_color:"",
    photo_color:"",
    site_bg_color:"", 
  };
  const [state, setState] = useState(initialState);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [bgfile, setBgFile] = useState(null);

  const getCompany= (aa) => {
    CompanyService.get(aa)
      .then(response => {
        setState(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    if (id)
      getCompany(id);
  }, [id]);

  const bgImgUrl = `${servicePath2}/files/${state.bg_image}`;

  const updateCompany = () => {
    
    const data = new FormData(); 

    /* eslint-disable no-restricted-syntax */


    for (const [key, val] of Object.entries(state)) {
      if (key!=='bg_image')
          data.append(key, val);
          
    }

    if (bgfile !== null){
      data.append("bg_image", bgfile);
    }

    console.log(data.get('smartcard_uid'));

    CompanyService.update(state.id, data)
      .then(response => {
        console.log(response.data);
        setMessage("The client was updated successfully!");
        setIsDisabled(false); // <--- here
        history.push("/app/minisite/minisite-list");
      })
      .catch(f => {
        console.log(f);
      });
  };

 
  const dropzoneComponentConfig = {
    postUrl: 'no-url',
  
  };
  const dropzoneConfigBgimg = {
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

  const eventHandlers = { addedfile: (file) => { setBgFile(file); } };
  
  const { messages } = intl;
  return (

    <>

<Row>
  <Colxx xxs="12">
    <Breadcrumb heading="menu.minisite-edit" match={match} />
    <Separator className="mb-5" />
  </Colxx>
</Row>
<Row className="mb-4">
  <Colxx xxs="12">
    <Card>
      <CardBody>
        <Form>
          <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="fontcolor">
                    <IntlMessages id="forms.minisite-fontcolor" />
                  </Label>
                  <Input
                    type="text"
                    value={state.font_color || ''}
                    onChange={(val) => setState({ ...state, font_color: val.target.value })}
                    placeholder={messages['forms.minisite-fontcolor']}

                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>

              </Colxx>
              <Colxx xxs="12" md="6">


                <FormGroup>
                  <Label for="fontsize">
                    <IntlMessages id="forms.minisite-fontsize" />
                  </Label>
                  <Input
                    type="text"
                    value={state.font_size || ''}
                    onChange={(val) => setState({ ...state, font_size: val.target.value })}
                    placeholder={messages['forms.minisite-fontsize']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontsize-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="fontcolor">
                    <IntlMessages id="forms.minisite-fontfamily" />
                  </Label>
                  <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-minisite-fontfamily"
                        options={fontfamilySelectData}
                        value={fontfamilySelectData.find(obj => {
                          return obj.value === state.font_family;
                        })}
                        onChange={(val) => setState({ ...state, font_family: val.value })}

                      />

                </FormGroup>

              </Colxx>
              <Colxx xxs="12" md="6">


                <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-text-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.text_color || ''}
                    onChange={(val) => setState({ ...state, text_color: val.target.value })}
                    placeholder={messages['forms.minisite-text-color']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="titletextcolor">
                    <IntlMessages id="forms.minisite-social-icon-bg-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.social_icon_bg_color || ''}
                    onChange={(val) => setState({ ...state, social_icon_bg_color: val.target.value })}
                    placeholder={messages['forms.minisite-social-icon-bg-color']}

                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>

              </Colxx>
              <Colxx xxs="12" md="6">


                <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-button-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.button_color || ''}
                    onChange={(val) => setState({ ...state, button_color: val.target.value })}
                    placeholder={messages['forms.minisite-button-color']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="titletextcolor">
                    <IntlMessages id="forms.minisite-links-hover-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.links_hover_color || ''}
                    onChange={(val) => setState({ ...state, links_hover_color: val.target.value })}
                    placeholder={messages['forms.minisite-links-hover-color']}

                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>

              </Colxx>
              <Colxx xxs="12" md="6">


                <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-links-not-hover-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.links_not_hover_color || ''}
                    onChange={(val) => setState({ ...state, links_not_hover_color: val.target.value })}
                    placeholder={messages['forms.minisite-links-not-hover-color']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>
         
            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="titletextcolor">
                    <IntlMessages id="forms.minisite-links-selected-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.links_selected_color || ''}
                    onChange={(val) => setState({ ...state, links_selected_color: val.target.value })}
                    placeholder={messages['forms.minisite-links-selected-color']}

                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>

              </Colxx>
              <Colxx xxs="12" md="6">


                <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-left-nav-bar-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.left_nav_bar_color || ''}
                    onChange={(val) => setState({ ...state, left_nav_bar_color: val.target.value })}
                    placeholder={messages['forms.minisite-left-nav-bar-color']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12" md="6" className="mb-5">

                <FormGroup>
                  <Label for="backgroundcolor">
                    <IntlMessages id="forms.minisite-backgroundcolor" />
                  </Label>
                  <Input
                    type="text"
                    value={state.bg_color || ''}
                    onChange={(val) => setState({ ...state, bg_color: val.target.value })}
                    placeholder={messages['forms.minisite-backgroundcolor']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>

              <Colxx xxs="12" md="6">


                <FormGroup>
                  <Label for="textcolor">
                    <IntlMessages id="forms.minisite-bio-wording-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.bio_wording_color || ''}
                    onChange={(val) => setState({ ...state, bio_wording_color: val.target.value })}
                    placeholder={messages['forms.minisite-bio-wording-color']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>
    
            <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                <FormGroup>
                  <Label for="photocolor">
                    <IntlMessages id="forms.minisite-photo-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.photo_color || ''}
                    onChange={(val) => setState({ ...state, photo_color: val.target.value })}
                    placeholder={messages['forms.minisite-photo-color']}

                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>

              </Colxx>
              <Colxx xxs="12" md="6">


                <FormGroup>
                  <Label for="backgroundcolor">
                    <IntlMessages id="forms.minisite-site-bg-color" />
                  </Label>
                  <Input
                    type="text"
                    value={state.site_bg_color || ''}
                    onChange={(val) => setState({ ...state, site_bg_color: val.target.value })}
                    placeholder={messages['forms.minisite-site-bg-color']}
                  />
                  <FormText color="muted">
                    <IntlMessages id="forms.minisite-fontcolor-muted" />
                  </FormText>
                </FormGroup>
              </Colxx>
            </Row>

            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="forms.minisite-backgroundimg" />
                </CardTitle> 
                <Row>
                <Colxx xxs="12" md="2" className="mb-5">
                  <img src={bgImgUrl} alt="backgroundImage"  width="150"/>
                </Colxx> 
                <Colxx xxs="12" md="10">  <DropzoneComponent
                  config={dropzoneComponentConfig}
                  djsConfig={dropzoneConfigBgimg}
                  eventHandlers={eventHandlers} multiple={false} />
                  
                </Colxx>
                </Row>
                </CardBody>
            </Card>
               
            <Button color="primary" className="mt-4" onClick={(e) => updateCompany(e)} disabled={isDisabled}>
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
 
export default injectIntl(EditClientModal);
