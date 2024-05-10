import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://43.202.145.172:8080',
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MiwiaWF0IjoxNzE0OTkxMjQ3LCJleHAiOjE3MTYyMDA4NDd9.PHjuNzaRIDS9U3JvhewggspfYfyxokIXl1N5s1PUH4k',
  },
  timeout: 1000,
});

export default instance;