import http from "http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/smartcards", { headers: authHeader() });
};

const get = id => {
  return http.get(`/smartcards/${id}`, { headers: authHeader() });
};

const create = data => {
  return http.post("/smartcards", data, { headers: authHeader() });
};

const update = (id, data) => {
  return http.put(`/smartcards/${id}`, data, { headers: authHeader() });
};

const remove = id => {
  return http.delete(`/smartcards/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return http.delete(`/smartcards`, { headers: authHeader() });
};

const findByName = name => {
  return http.get(`/smartcards?name=${name}`, { headers: authHeader() });
};

const CardsService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default CardsService;
