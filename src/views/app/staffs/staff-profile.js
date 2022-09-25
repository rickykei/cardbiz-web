/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
  
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Row, Card, CardBody, Badge, CardTitle, CardSubtitle, CardText, Button, } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import StaffDataService from 'services/StaffsService';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useParams,Link } from "react-router-dom";
import SingleLightbox from 'components/pages/SingleLightbox';
import VcfVisitsChartCard from 'containers/dashboards/VcfVisitsChartCard';
import ProfileVisitsChartCard from 'containers/dashboards/ProfileVisitsChartCard';
import { servicePath3, servicePath2 } from 'constants/defaultValues';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import PerfectScrollbar from 'react-perfect-scrollbar';


import data from 'data/logs';


const StaffProfileModal = ({ intl, match, }) => {
  const initialState = {
    id: null,
    name: "",
    code: "",
    no_of_license: "",
    no_of_admin: "",
    status: true,
    company_id: [],
  };
  const [state, setState] = useState(initialState);
  const { messages } = intl;
  const [copyProfileSuccess, setCopyProfileSuccess] = useState('');
  const [copyVcfSuccess, setCopyVcfSuccess] = useState('');
  const [copyMoreInfoSuccess, setCopyMoreInfoSuccess] = useState('');

  const { id } = useParams();
  const profilePageURL = `${servicePath3}/Touchless/Profile.php?sig=${state.id}`;
  const vcfDLURL = `${servicePath3}/genvcf.php?sig=${state.id}`;
  const moreInfoURL = `${servicePath3}/?sig=${state.id}`;
  const qrcodeURL = `${servicePath3}/Touchless/genvcf2png.php?sig=${state.id}`;
  const username = `${state.fname} ${state.lname}`;
  const hsImgUrl = `${servicePath2}/files/${state.headshot}`;
  const bannerImgUrl = "/assets/img/social/header.jpg";
  const bannerImgUrl2 = `${servicePath2}/files/${state.company_id.banner}`;
  const staffEditUrl = `../staff-edit/${state.id}`;


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

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(
      () => {
        if (newClip === vcfDLURL)
          setCopyVcfSuccess("Copied!");
        else if (newClip === moreInfoURL)
          setCopyMoreInfoSuccess("Copied!");
         else
          setCopyProfileSuccess("Copied!");
      },
      () => {
        if (newClip === vcfDLURL)
          setCopyVcfSuccess("Copy failed!");
        else if (newClip === moreInfoURL)
          setCopyProfileSuccess("Copy failed!");
         else
         setCopyMoreInfoSuccess("Copy failed!"); 
      }
    );
  }
  const copyLink = () => {

    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(profilePageURL);
        }
      }).catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }
  const copyLink2 = () => {

    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(vcfDLURL);
        }
      })
      .catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }
  const copyLink3 = () => {

    navigator.permissions
      .query({ name: "clipboard-write" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          updateClipboard(moreInfoURL);
        }
      })
      .catch((error) => {
        // couldn't query the permission
        console.error(error);
      });
  }
  return (

    <>

      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.staffs-profile" match={match} /> <div className="text-zero top-right-button-container">
          <Link to={staffEditUrl}><Button
              color="primary"
              size="lg"
              className="top-right-button"
             >
              <IntlMessages id="profile.button.edit" />
            </Button>
            </Link>
            {'  '}
            
          </div>
          <Separator className="mb-5" />

         
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>

            <CardBody>

              <Row>
                <Colxx xxs="12" className="mb-5">
                  <Card>
                    {state.company_id.banner !== undefined &&
                      <SingleLightbox thumb={bannerImgUrl2} large={bannerImgUrl2} className="social-header card-img" />}

                    {state.company_id.banner === undefined &&
                      <SingleLightbox thumb={bannerImgUrl} large={bannerImgUrl} className="social-header card-img" />}
                  </Card>
                </Colxx>
                <Colxx xxs="12" lg="5" xl="4" className="col-left">
                {state.headshot !== undefined && state.headshot !== "" &&
                  <SingleLightbox
                    thumb={hsImgUrl}
                    large={hsImgUrl}
                    className="img-thumbnail card-img social-profile-img"
                  />}
                  {state.headshot === "" &&
                  <SingleLightbox
                    thumb="/assets/img/profiles/1.jpg"
                    large="/assets/img/profiles/1.jpg"
                    className="img-thumbnail card-img social-profile-img"
                  />}

                  <Card className="mb-4">
                    <CardBody>
                      <div className="text-center pt-4">
                        <p className="list-item-heading pt-2">{state.fname} </p>
                      </div>
                      <p className="mb-3">{messages['forms.staff-firstname']}  </p>


                      <p className="text-muted text-small mb-2"> <IntlMessages id="pages.address" /> </p>
                      {state.address !== undefined && state.address !== "" &&
                        <p className="mb-3">{state.address} </p>
                      }


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="profile.label.position" />
                      </p>
                      {state.position !== undefined && state.position !== "" &&
                        <p className="mb-3">{state.position} </p>
                      }

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="profile.label.division" />
                      </p>
                      {state.division !== undefined && state.division !== "" &&
                        <p className="mb-3">{state.division} </p>
                      }

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="profile.label.country" />
                      </p>
                      {state.country !== undefined && state.country !== "" &&
                        <p className="mb-3">{state.country} </p>
                      }


                    <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.department" />
                      </p>
                      {state.department !== undefined && state.department !== "" &&
                        <p className="mb-3">{state.department} </p>
                      }


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.work_tel" />
                      </p>
                      {state.work_tel !== undefined && state.work_tel !== "" &&
                        <p className="mb-3">{state.work_tel} </p>
                      }
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.mobile" />
                      </p>
                      {state.mobile !== undefined && state.mobile !== "" &&
                        <p className="mb-3">{state.mobile} </p>
                      }
                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.work_email" />
                      </p>
                      {state.work_email !== undefined && state.work_email !== "" &&
                        <p className="mb-3">{state.work_email} </p>
                      }


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="pages.additionalInfo" />
                      </p>
                      <p className="mb-3"><Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                       <a href={moreInfoURL} target="_blank" rel="noreferrer"  ><IntlMessages id="profile.button.moreInfo" /> </a>
                       </Badge>
                         <Button onClick={copyLink3} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyMoreInfoSuccess}</p>



                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="menu.webprofilepage" />
                      </p>

                      <p className="mb-3"><Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      ><a href={profilePageURL} target="_blank" rel="noreferrer"  > <IntlMessages id="profile.button.goProfile" /> </a> 
                      </Badge> 
                       <Button onClick={copyLink} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyProfileSuccess}</p>

                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="menu.downloadVCFContent" />
                      </p>
                      <p className="mb-3"> <Badge
                        color="outline-secondary"
                        className="mb-1 mr-1"
                        pill
                      >
                        <a href={vcfDLURL}> <IntlMessages id="profile.button.downloadVcf" /></a></Badge>
                        <Button onClick={copyLink2} color="secondary" className="mt-6"> <i className="iconsminds-file-copy" /></Button>{copyVcfSuccess}</p>


                      <p className="text-muted text-small mb-2">
                        <IntlMessages id="menu.socialMedia" />
                      </p>


                      <div className="social-icons">
                        <ul className="list-unstyled list-inline">

                          {state.facebook_url !== undefined && state.facebook_url !== "" &&
                            <li className="list-inline-item">
                              <a href={state.facebook_url}>
                                <i className="simple-icon-social-facebook" />
                              </a>
                            </li>
                          }

                          {state.instagram_url !== undefined && state.instagram_url !== "" &&
                            <li className="list-inline-item">
                              <a href={state.instagram_url}>
                                <i className="simple-icon-social-instagram" />
                              </a>
                            </li>
                          }

                          {state.twitter_url !== undefined && state.twitter_url !== "" &&
                            <li className="list-inline-item">
                              <a href={state.twitter_url}>
                                <i className="simple-icon-social-twitter" />
                              </a>
                            </li>
                          }

                          {state.linkedin_url !== undefined && state.linkedin_url !== "" &&
                            <li className="list-inline-item">
                              <a href={state.linkedin_url}>
                                <i className="simple-icon-social-linkedin" />
                              </a>
                            </li>
                          }


                          {state.youtube_url !== undefined && state.youtube_url !== "" &&
                            <li className="list-inline-item">
                              <a href={state.youtube_url}>
                                <i className="simple-icon-social-youtube" />
                              </a>
                            </li>
                          }
                          {state.whatsapp_url !== undefined && state.whatsapp_url !== "" &&
                            <li className="list-inline-item">
                              <a href={state.whatsapp_url}>
                                <i className="iconsminds-speach-bubble-11" />
                              </a>
                            </li>
                          }
                        

                        </ul>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle>
                        <IntlMessages id="pages.QRcode" />
                      </CardTitle>
                      <img alt="qrcode" src={qrcodeURL} width="200" />
                    </CardBody>
                  </Card>

                </Colxx>
                <Colxx xxs="12" lg="7" xl="8" className="col-right">

                  <p><ProfileVisitsChartCard />  </p>


                  <p><VcfVisitsChartCard />  </p>


                  <Card className="d-flex flex-row mb-4">

                    <ThumbnailLetters
                      rounded
                      small
                      text={username}
                      className="m-4"
                    />

                    <div className=" d-flex flex-grow-1 min-width-zero">
                      <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                        <div className="min-width-zero">

                          <CardSubtitle className="truncate mb-1">
                            {state.fname} {state.lname}
                          </CardSubtitle>

                          <CardText className="text-muted text-small mb-2">
                            <p> {state.position}</p>
                            <p> Uid : {state.smartcard_uid}</p>


                          </CardText>
                        </div>
                      </CardBody>
                    </div>
                  </Card>

                  <div>
                    <Card>
                      <CardBody>
                        <CardTitle>
                          <IntlMessages id="dashboards.logs" />
                        </CardTitle>
                        <div className="dashboard-logs">
                          <PerfectScrollbar
                            options={{ suppressScrollX: true, wheelPropagation: false }}
                          >
                            <table className="table table-sm table-borderless">
                              <tbody>
                                {data.map((log, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <span
                                          className={`log-indicator align-middle ${log.color}`}
                                        />
                                      </td>
                                      <td>
                                        <span className="font-weight-medium">
                                          {log.label}
                                        </span>
                                      </td>
                                      <td className="text-right">
                                        <span className="text-muted">{log.time}</span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </PerfectScrollbar>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                </Colxx>

              </Row>


            </CardBody>
          </Card>
        </Colxx>
      </Row>


    </>
  );
};

export default injectIntl((StaffProfileModal));
