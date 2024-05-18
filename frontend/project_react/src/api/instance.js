import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://allbom.site',
  timeout: 2000,
});

export default instance;
