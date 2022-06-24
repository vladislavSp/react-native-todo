export const apiMethods = {
    leagues: `/leagues`,
    standings: (id, season = 2021) => `/standings?id=${id}&season=${season}`,
    cupMatches: (id, season) => `/cup?id=${id}season=${season}`,
};

export default apiMethods;
