
import http from "http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/companies", { headers: authHeader() });
};

const get = id => {
  return http.get(`/companies/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/companies", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.post(`/companies/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/companies/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/companies`, { headers: authHeader() });
};

const findByName = name => {
  return http.get(`/companies?name=${name}`, { headers: authHeader() });
};

const CompanyService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default CompanyService;
