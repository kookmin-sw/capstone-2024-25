import instance from '../instance';

export const authApi = {
  signUp: (data) => instance.post('auth/register', data),
  logIn: (data) => instance.post('auth/login', data),
  kakaoLogin: (code) => instance.get(`auth/kakao/callback?code=${code}`),
  // logOut: (accessToken) => instance.delete('auth/logout'),
};
