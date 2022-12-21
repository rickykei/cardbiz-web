/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Row, Card, CardBody, Badge, CardTitle, CardSubtitle, CardText, Button, } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import StaffDataService from 'services/StaffsService';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useParams, Link } from "react-router-dom";
import SingleLightbox from 'components/pages/SingleLightbox';
import VcfVisitsChartCard from 'containers/dashboards/VcfVisitsChartCard';
import ProfileVisitsChartCard from 'containers/dashboards/ProfileVisitsChartCard';
import { servicePath3, servicePath2 } from 'constants/defaultValues';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ActionLogDataService from 'services/ActionLogDataService';
 
 
const StaffProfileModal = ({ intl, match}) => {
  console.log("staffprofile");
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
   
  const [copyMoreInfoSuccess, setCopyMoreInfoSuccess] = useState('');

  const { id } = useParams();

  const moreInfoURL = `${servicePath3}/?sig=${state.id}`;
  const qrcodeURL = `${servicePath3}/Touchless/genvcf2png.php?sig=${state.id}`;
  const username = `${state.fname} ${state.lname}`;
  const hsImgUrl = `${servicePath2}/files/${state.headshot}`;
  const bannerImgUrl = "/assets/img/social/header.jpg";
  const bannerImgUrl2 = `${servicePath2}/files/${state.company_id.banner}`;
  const staffEditUrl = `../staff-edit/${state.id}`;
  const [adminLogData, setStaffLogData] = useState([]);




  const getStaffLog = (aa) => {
    
    ActionLogDataService.getByStaffId(aa)
      .then(response => {
        setStaffLogData(response.data);
        console.log(adminLogData);
      })
      .catch(e => {
        console.log(e);
      });
  };


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
    if (id){
      getStaff(id);
      getStaffLog(id);
    }
  }, [id]);

  const updateClipboard = (newClip) => {
    navigator.clipboard.writeText(newClip).then(
      () => {
     
   
          setCopyMoreInfoSuccess("Copied!");
       
      },
      () => {
     
      
          setCopyMoreInfoSuccess("Copy failed!");
      }
    );
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
                        <p className="list-item-heading pt-2">{state.name_eng} {state.name_chi}</p>
                      </div>
                      <p className="mb-3">{messages['forms.staff-name_eng']}  </p>
                      {state.rc_no ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.rc_no" />
                        </p><p className="mb-3">{state.rc_no} </p></>
                      ) : ''}
                      {state.staff_no ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.staff_no" />
                        </p><p className="mb-3">{state.staff_no} </p></>
                      ) : ''}
                      {state.title_eng ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.title_eng" />
                        </p><p className="mb-3">{state.title_eng} </p></>
                      ) : ''}
                      {state.title_chi ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.title_chi" />
                        </p><p className="mb-3">{state.title_chi} </p></>
                      ) : ''}
                       
                      {state.address_eng ? (
                        <><p className="text-muted text-small mb-2"> <IntlMessages id="pages.address_eng" /> </p>
                          <p className="mb-3">{state.address_eng || 'N/A'} </p></>
                      ) : ''}

                     

                      {state.subsidiary_eng ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="profile.label.subsidiary_eng" />
                        </p> <p className="mb-3">{state.subsidiary_eng || 'N/A'} </p></>
                      ) : ''}

                      

                      {state.work_tel ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.work_tel" />
                        </p> <p className="mb-3">{state.work_tel} </p></>
                      ) : ''}
                      {state.direct_tel ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.direct_tel" />
                        </p> <p className="mb-3">{state.direct_tel} </p></>
                      ) : ''} 
                      {state.mobile_tel ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.mobile_tel" />
                        </p><p className="mb-3">{state.mobile_tel} </p></>
                      ) : ''}

                      {state.work_email ? (
                        <><p className="text-muted text-small mb-2">
                          <IntlMessages id="pages.work_email" />
                        </p><p className="mb-3">{state.work_email} </p></>
                      ) : ''}


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

                         
                    
                      
                    </CardBody>
                  </Card>

                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle>
                        <IntlMessages id="pages.QRcode" />
                      </CardTitle>
                      <img alt="qrcode" src={qrcodeURL} width="300" />
                    </CardBody>
                  </Card>

                </Colxx>
                <Colxx xxs="12" lg="7" xl="8" className="col-right">

                  <ProfileVisitsChartCard className="mb-4"/>   

                  <VcfVisitsChartCard className="mb-4"/>
                  

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
                                {adminLogData.map((log, index) => {
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
const mapStateToProps = ({  authUser }) => {
   
  const { currentUser } = authUser;
  return {
    
    currentUser
  };
};
export default injectIntl(connect(mapStateToProps)(StaffProfileModal));
