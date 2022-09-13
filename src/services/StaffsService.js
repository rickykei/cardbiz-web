
import http from "http-common";

const getAll = () => {
  return http.get("/staffs");
};

const get = id => {
  return http.get(`/staffs/${id}`);
};

const create = data => {
  return http.post("/staffs", data);
};

const update = (id, data) => {
  return http.post(`/staffs/${id}`, data);
};

const remove = id => {
  return http.delete(`/staffs/${id}`);
};

const removeAll = () => {
  return http.delete(`/staffs`);
};

const findByName = name => {
  return http.get(`/staffs?name=${name}`);
};

const StaffsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default StaffsService;
