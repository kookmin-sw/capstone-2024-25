import axios from 'axios';
import { Cookies } from 'react-cookie';

const instance = axios.create({
  baseURL: 'https://allbom.site',
  timeout: 1000,
});

export default instance;
