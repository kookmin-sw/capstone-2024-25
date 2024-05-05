import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://43.202.145.172:8080',
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MiwiaWF0IjoxNzE0OTEzMTc0LCJleHAiOjE3MTYxMjI3NzR9.dyPjLvJepDcJapD0zacuGXtWvrVdXCfBEFvS1iIphgY',
  },
  timeout: 1000,
});

export default instance;