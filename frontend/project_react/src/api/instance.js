import axios from 'axios';

const instance = axios.create({
  // baseURL: 'url을 여기에...'
  // 추후 토큰 인증을 위한 코드
  // headers: {
  //   access_token: cookies.get('access_token'),
  // },
  // params: {
  //   api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
  // },
  timeout: 1000,
});

export default instance;