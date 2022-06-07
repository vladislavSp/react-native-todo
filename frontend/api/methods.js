export const apiMethods = {
    leagues: `/leagues`,
    seasonWithTeams: (leagueId, season) => `/teams?leagueId=${leagueId}&season=${season}`,
};

export default apiMethods;
