const routes = {
    teams: (leagueId, season) => `teams?league=${leagueId}&season=${season}`,
    statistics: (leagueId, season, id) => `teams/statistics?league=${leagueId}&season=${season}&team=${id}`,
};

module.exports = routes;
