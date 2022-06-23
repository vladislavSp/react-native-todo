export const apiMethods = {
    leagues: `/leagues`,
    // seasonWithTeams: (leagueId, season) => `/teams?leagueId=${leagueId}&season=${season}`,
    leagueStandings: (id, season = 2021) => `/league?leagueId=${id}&season=${season}`,
    cupMatches: (id, season) => `/cup?id=${id}season=${season}`,
};

export default apiMethods;
