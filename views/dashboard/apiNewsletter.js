import axios from 'axios';
const URL = process.env.URL;
const users = JSON.parse(localStorage.getItem("user_details"))
const headers = {
  "Content-Type": "application/json",
};


axios.defaults.baseURL = URL;

export const getNewsletter = () => {
    return axios.get(`${URL}/api/newsletter`, headers)
  };