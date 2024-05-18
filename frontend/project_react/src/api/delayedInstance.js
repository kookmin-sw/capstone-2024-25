import axios from 'axios';

const delayedInstance = axios.create({
  baseURL: 'https://allbom.site',
  timeout: 60000,
});

export default delayedInstance;
