import axios from 'axios';
import { Cookies } from 'react-cookie';

const delayedInstance = axios.create({
  baseURL: 'https://allbom.site',
  timeout: 25000,
});

export default delayedInstance;
