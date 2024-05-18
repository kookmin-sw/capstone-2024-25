import instance from '../instance';

export const medicineApis = {
  register: (data, accessToken) =>
    instance.post('/api/medicine', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  // 약품 리스트 조회
  getList: (accessToken) =>
    instance.get('/api/medicine', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  // 약품 삭제
  delete: (id, accessToken) =>
    instance.delete(`/api/medicine/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  // 약품 수정
  update: (id, data, accessToken) =>
    instance.patch(`/api/medicine/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
