import instance from '../instance';

export const memberApis = {
  duplicate: (id) => instance.get(`/api/member/duplicate?loginId=${id}`),
  register: (data, accessToken) =>
    instance.patch('/api/member/register', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
