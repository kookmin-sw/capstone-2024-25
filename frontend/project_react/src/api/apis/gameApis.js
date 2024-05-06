import instance from '../instance'

export const wordOrderApis = {
    getSentenceCategory: () => instance.get(process.env.PUBLIC_URL + '/tmpApiData/wordOrderDummy.json'),
    getSentenceData: (category) => instance.get('api/game', {
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