import delayedInstance from '../delayedInstance';
import instance from '../instance';

export const wordOrderApis = {
  getProgress: (accessToken) =>
    instance.get('api/game/progress', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getSentence: (accessToken, type) =>
    instance.get('api/game', {
      params: {
        type: type,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  postUserAnswer: (accessToken, type, answer) =>
    instance.post(
      'api/game',
      {
        sentence: answer,
      },
      {
        params: {
          type: type,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),
  postUserSkip: (accessToken, type) =>
    instance.post(
      'api/game/skip',
      {},
      {
        params: {
          type: type,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ),
};

export const crossWordApis = {
  getCrossWordData: () => {},
  postUserCorrect: () => {},
  postUserSkip: () => {},
};

export const twentyHeadsApis = {
  getTwentyHeadsData: (accessToken) => {
    return delayedInstance.get('api/chatbot/game', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  postUserAnswer: (accessToken, userAnswer) => {
    return delayedInstance.post(
      'api/chatbot/game',
      {
        isGame: true,
        question: userAnswer,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },
};
