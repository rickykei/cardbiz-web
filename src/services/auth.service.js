import axios from "axios";

const SIGNUP_API_URL = "https://e-profile.digital/api/auth/signup";
const SIGNIN_API_URL = "https://e-profile.digital/api/auth/signin";

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

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
