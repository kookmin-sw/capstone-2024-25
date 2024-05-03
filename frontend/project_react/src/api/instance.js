import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://43.202.145.172:8080',
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6NywiaWF0IjoxNzE0NzE4Mjk3LCJleHAiOjE3MTU5Mjc4OTd9.ZvGwAMWGuRaUZfpT8yVIwFpLxI2--p022FUyAfySKYg',
  },
  timeout: 1000,
});

export default instance;