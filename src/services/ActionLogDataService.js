import http from "http-common";
import authHeader from "./auth-header";

const getByAdminId = id => {
  return http.get(`/action_logs/getByAdminId?pageSize=100&currentPage=1&uid=${id}`, { headers: authHeader() });
};
const getByStaffId = id => {
  return http.get(`/action_logs/getByStaffId?pageSize=100&currentPage=1&staffId=${id}`, { headers: authHeader() });
};
 
const ActionLogDataService = {
  getByAdminId,
  getByStaffId,
};
export default ActionLogDataService;
