import instance from "../instance";

export const wordOrderApis = {
    getSentenceCategory: () => instance.get("???"),
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