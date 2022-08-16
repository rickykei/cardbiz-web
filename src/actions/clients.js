import {
  CREATE_CLIENT,
  RETRIEVE_CLIENTS,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  DELETE_ALL_CLIENTS
} from "./types";

import ClientDataService from "../services/client.service";

export const createClient = (title, description) => async (dispatch) => {
  try {
    const res = await ClientDataService.create({ title, description });

    dispatch({
      type: CREATE_CLIENT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveClients = () => async (dispatch) => {
  try {
    const res = await ClientDataService.getAll();

    dispatch({
      type: RETRIEVE_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateClient = (id, data) => async (dispatch) => {
  try {
    const res = await ClientDataService.update(id, data);

    dispatch({
      type: UPDATE_CLIENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteClient = (id) => async (dispatch) => {
  try {
    await ClientDataService.delete(id);

    dispatch({
      type: DELETE_CLIENT,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllClients = () => async (dispatch) => {
  try {
    const res = await ClientDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_CLIENTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findClientsByCode = (code) => async (dispatch) => {
  try {
    const res = await ClientDataService.findByCode(code);

    dispatch({
      type: RETRIEVE_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};