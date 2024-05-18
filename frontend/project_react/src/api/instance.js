import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://allbom.site',
  timeout: 1000,
});

export default instance;
