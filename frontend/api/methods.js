export const apiMethods = {
    // leagues: `/leagues`,
    // seasonWithTeams: (leagueId, season) => `/teams?leagueId=${leagueId}&season=${season}`,
    leagues: `/competitions`,
    leagueMain: (id, season = 2021) => `/competitions/${id}/standings?season=${season}`,
};

export default apiMethods;
