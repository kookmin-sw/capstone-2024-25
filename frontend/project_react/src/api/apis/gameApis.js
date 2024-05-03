import { api_get, } from "../crud";

export const wordOrderApis = {
    getSentenceCategory: () => api_get(process.env.PUBLIC_URL + '/tmpApiData/wordOrderDummy.json'),
    getSentenceData: (category) => api_get('api/game', {
        params: {
            type: category,
        },
    }),
    postUserCorrect: () => {},
    postUserSkip: () => {},
}

export const crossWordApis = {
    getCrossWordData: () => {},
    postUserCorrect: () => {},
    postUserSkip: () => {},
}

export const twentyHeadsApis = {
    getTwentyHeadsData: () => {},
    postUserCorrect: () => {},
    postUserSkip: () => {},
}