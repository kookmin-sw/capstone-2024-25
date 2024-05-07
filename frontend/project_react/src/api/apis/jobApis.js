import instance from '../instance';

export const jobApis = {
  getJobList: (sorted, page, accesToken) =>
    instance.get(`/api/job?sorted=${sorted}&page=${page}&size=10`, {
      // instance.get(`/api/job?sorted=${sorted}&page=${page}&size=1`, { // 페이지네이션 테스트용
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesToken}`,
      },
    }),
  getJobDetail: (id, accessToken) =>
    instance.get(`/api/job/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
