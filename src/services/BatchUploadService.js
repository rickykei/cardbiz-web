import http from "http-common";
import authHeader from "./auth-header";

const staffbatchupload = data => {
  return http.post("/batch_upload/uploadStaffExcel", data, { headers: authHeader() });
};
 
const BatchUploadService = {
    staffbatchupload
};

export default BatchUploadService;
