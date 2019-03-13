import axios from 'axios';

export const baseURL = `https://immense-earth-39143.herokuapp.com/`;

const token = sessionStorage.getItem('jwtToken');

var instance = null;

if (token == null) {
  instance = axios.create({
    baseURL: baseURL,
  });
} else {
  instance = axios.create({
    baseURL: baseURL,
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });
}

export default instance;
