import axios from 'axios';
import { Cookies } from 'react-cookie';

const delayedInstance = axios.create({
  baseURL: 'http://43.202.145.172:8080',
  timeout: 25000,
});

export default delayedInstance;
