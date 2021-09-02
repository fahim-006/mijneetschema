import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;
const users = JSON.parse(localStorage.getItem("user_details"))
const headers = {
  "Content-Type": "application/json",
};


axios.defaults.baseURL = URL;


export const createNewsletter = data => {
    return axios
      .post(`${URL}/newsletter`, data, headers)
      .then(res => res)
      .catch(err => err);
  };

  export const getNewsletter = () => {
    return axios
      .get(`${URL}/newsletter`, headers)
      .then(res => res)
      .catch(err => err);
  };