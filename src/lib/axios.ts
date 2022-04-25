import Axios from 'axios';

// import { API_URL } from '@/config';

export const axios = Axios.create({
  baseURL:
    'https://us-central1-tracer-tech.cloudfunctions.net/app/fantasy-callendar',
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
