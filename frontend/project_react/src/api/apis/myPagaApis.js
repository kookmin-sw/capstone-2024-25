import instance from '../instance';

export const myPagaApis = {
  getInfo: (accessToken) =>
    instance.get(`/api/mypage`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  updateNumber: (data, accessToken) =>
    instance.patch(`/api/mypage/phonenumber`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  updateBirthday: (data, accessToken) =>
    instance.patch(`/api/mypage/birthday`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  updateAddress: (data, accessToken) =>
    instance.patch('/api/mypage/address', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
