import http from "../http-common";

class ClientDataService {
  getAll() {
    return http.get("/api/companies");
  }

  get(id) {
    return http.get(`/api/companies/${id}`);
  }

  create(data) {
    return http.post("/api/companies", data);
  }

  update(id, data) {
    return http.put(`/api/companies/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/companies/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/companies`);
  }

  findByTitle(title) {
    return http.get(`/companies?title=${title}`);
  }
}

export default new ClientDataService();