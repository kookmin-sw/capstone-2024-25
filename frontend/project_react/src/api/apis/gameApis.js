import instance from '../instance';

export const wordOrderApis = {
  getProgress: (accessToken) =>
    instance.get('api/game/progress', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  postUserCorrect: () => {},
  postUserSkip: () => {},
};

export const crossWordApis = {
  getCrossWordData: () => {},
  postUserCorrect: () => {},
  postUserSkip: () => {},
};

export const twentyHeadsApis = {
  getTwentyHeadsData: () => {},
  postUserCorrect: () => {},
  postUserSkip: () => {},
};
