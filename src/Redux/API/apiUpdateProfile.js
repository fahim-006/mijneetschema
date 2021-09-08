import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const updateTrainerProfile = data => {
    return axios.post(`${URL}/edit-trainer`, data, {
        header: {
            "Content-type" : "application/json",
        }
    })
}