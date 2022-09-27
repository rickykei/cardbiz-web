/* eslint-disable import/no-extraneous-dependencies */
import React, {useState,useEffect} from 'react';
import {  Card,  CardBody,  UncontrolledDropdown,  DropdownItem,  DropdownToggle,  DropdownMenu,} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { AreaChart } from 'components/charts';
import { ThemeColors } from 'helpers/ThemeColors';
import { servicePath2 } from 'constants/defaultValues';
import axios from 'axios';
import { useParams, } from "react-router-dom";

let apiUrl ="";
const colors = ThemeColors();

const WebsiteVisitsChartCard = ({ className = '', controls = true }) => {

  const { id } = useParams();
  console.log("id".concat(id));
  const [options, setOptions] = useState([]);
  let areaChartData = {};
  apiUrl=`${servicePath2}/vcf_counter/getVcfCountByStaffId?staff_id=` ;
  apiUrl=apiUrl.concat(id);

  console.log(apiUrl);

  async function fetchData() {
  
    axios.get(`${apiUrl}`)
    
      .then((data) => {
          
          areaChartData = {
            labels: data.data.labels,
            datasets: [
              {
                label: '',
                data: data.data.count ,
                borderColor: colors.themeColor1,
                pointBackgroundColor: colors.foregroundColor,
                pointBorderColor: colors.themeColor1,
                pointHoverBackgroundColor: colors.themeColor1,
                pointHoverBorderColor: colors.foregroundColor,
                pointRadius: 4,
                pointBorderWidth: 2,
                pointHoverRadius: 2,
                fill: true,
                borderWidth: 2,
                backgroundColor: colors.themeColor1_10,
              },
            ],
          };
          setOptions(areaChartData);
          
      })
      .catch(error => {
  
        console.error('There was an error to get VcfCountbyStaffid!', error);
      })
  
  
  }
  

 

  useEffect(() => {
    fetchData();
  }, []);
     
 
  return (
    <Card className={`${className} dashboard-filled-line-chart`}>
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              <IntlMessages id="dashboards.website-visits" />
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

      <div className="chart card-body pt-0">
        <AreaChart shadow data={options} /> 
      </div>
    </Card>
  );
};

export default WebsiteVisitsChartCard;
