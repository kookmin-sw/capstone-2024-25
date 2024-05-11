import instance from '../instance';

export const todoApis = {
  getAllTodo: (accessToken) =>
    instance.get('api/todo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getNextTodo: (accessToken, type) =>
    instance.patch(`api/todo/next/${type}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getPreviousTodo: (accessToken, type) =>
    instance.patch(`api/todo/previous/${type}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  postTodoClear: (accessToken, type) =>
    instance.post(`api/todo/${type}`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
