import axios from 'axios';
import { Cookies } from 'react-cookie';

const instance = axios.create({
  baseURL: 'http://43.202.145.172:8080',
  timeout: 1000,
});

export default instance;
