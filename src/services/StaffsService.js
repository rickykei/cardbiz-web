
import http from "http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/staffs", { headers: authHeader() });
};

const get = id => {
  return http.get(`/staffs/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/staffs", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/staffs/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/staffs/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/staffs`, { headers: authHeader() });
};

const findByName = name => {
  return http.get(`/staffs?name=${name}`, { headers: authHeader() });
};

const sendNotification = data =>{
  return http.post("/staffs/sendNotification", data, { headers: authHeader() });
}

const StaffsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  sendNotification
};

export default StaffsService;
