export const apiMethods = {
    leagues: `/leagues`,
    leagueStandings: (id, season = 2021) => `/league?id=${id}&season=${season}`,
    cupMatches: (id, season) => `/cup?id=${id}season=${season}`,
};

export default apiMethods;
