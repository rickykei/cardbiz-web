import http from "http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/users", { headers: authHeader() });
};

const get = id => {
  return http.get(`/users/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/users", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/users/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/users`, { headers: authHeader() });
};

const findByName = name => {
  return http.get(`/users?name=${name}`, { headers: authHeader() });
};

const UsersService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default UsersService;
