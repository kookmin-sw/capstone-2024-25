import instance from '../instance';

export const authApi = {
  signUp: (data) => instance.post('auth/register', data),
  login: (data) => instance.post('auth/login', data),
};
