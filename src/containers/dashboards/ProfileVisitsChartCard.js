/* eslint-disable import/no-extraneous-dependencies */
import React, {useState,useEffect} from 'react';
import {  Card,  CardBody,  UncontrolledDropdown,  DropdownItem,  DropdownToggle,  DropdownMenu,} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { AreaChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';
import { servicePath2 } from 'constants/defaultValues';
import axios from 'axios';
import { useParams, } from "react-router-dom";

  
const ProfileVisitsChartCard = ({ className = '', controls = true }) => {

  let apiUrl ="";
const colors = ThemeColors();
  const { id } = useParams();
  console.log("id".concat(id));
  const [options, setOptions] = useState([]);
   
  apiUrl=`${servicePath2}/profile_counter/getProfileCountByStaffId?staff_id=` ;
  apiUrl=apiUrl.concat(id);
  let areaChartData2;
  
  if (options.count !== undefined) {
    areaChartData2 = {
      labels: (options.labels ? options.labels : ''),
      datasets: [
        {
          label: '',
          data: (options.count ? options.count : ''),
          borderColor: colors.themeColor1,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 4,
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          fill: true,
          borderWidth: 2,
          backgroundColor: colors.themeColor1_10,
        },
      ],
    };

  }
  

 
  useEffect(() => {
    const expensesListResp = async () => {
        await axios.get(`${apiUrl}`)
          .then(
            response => setOptions(response.data))
      }
      expensesListResp();
    }, [])


  return (
    <Card className={`${className} dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="dashboards.profile-visits" />
            </h5>
            <span className="text-muted text-small d-block">
              <IntlMessages id="dashboards.unique-visitors" />
            </span>
          </div>
        </div>
        {controls && (
          <div className="btn-group float-right float-none-xs mt-2">
            <UncontrolledDropdown>
              <DropdownToggle caret color="primary" className="btn-xs" outline>
                <IntlMessages id="dashboards.this-week" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="dashboards.last-week" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="dashboards.this-month" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </CardBody>
      {areaChartData2!==null && areaChartData2!==undefined && ( 
      <div className="chart card-body pt-0">
        <AreaChart shadow data={areaChartData2} />
      </div>)}
    </Card>
  );
};

export default ProfileVisitsChartCard;
