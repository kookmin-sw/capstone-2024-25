import instance from '../instance';
import delayedInstance from '../delayedInstance';

export const chatbotApis = {
  getChatList: (accessToken) =>
    instance.get(`/api/chatbot`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  postChat: (data, accessToken) =>
    delayedInstance.post('/api/chatbot', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
