import instance from '../instance';
import delayedInstance from '../delayedInstance';

export const chatbotApis = {
  getChatList: (accessToken, chatPage) =>
    instance.get(`/api/chatbot?page=${chatPage}&size=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  // getChatList: (accessToken, chatPage) =>
  //     instance.get(`/api/chatbot?page=${chatPage}&size=10`, {
  //         headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //         },
  //     }),
  postChat: (data, accessToken) =>
    delayedInstance.post('/api/chatbot', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};
