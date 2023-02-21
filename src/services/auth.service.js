import axios from "axios";
import { servicePath2 } from 'constants/defaultValues';


const SIGNUP_API_URL = `${servicePath2}/auth/signup`;
const SIGNIN_API_URL = `${servicePath2}/auth/signin`;
const CHANGEPASSWORD_API_URL = `${servicePath2}/auth/changePassword`;

const register = (username, email, password, roles) => {
  return axios.post(SIGNUP_API_URL , {
    username,
    email,
    password,
	roles,
  });
};

const login = (username, password) => {
  return axios
    .post(SIGNIN_API_URL, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const loginWithToken = (username, password,token) => {
  return axios
    .post(SIGNIN_API_URL, {
      username,
      password,
      token
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};


const changePassword = (id, password) => {
  return axios
    .post(CHANGEPASSWORD_API_URL, {
      id,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const authService = {
  register,
  login,
  logout,
  changePassword,
  loginWithToken,
};

export default authService;
