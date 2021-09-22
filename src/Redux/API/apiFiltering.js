import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

const headers = {
  "Content-Type": "application/json",
};


axios.defaults.baseURL = URL;


export const getFilteredTrainer = (filters = {}) => {
    const data = {
        filters: {...filters}
    }
    return axios
      .post(`${URL}/users/fetch-trainer/filter`, data, headers)
  };