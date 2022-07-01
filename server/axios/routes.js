const routes = {
    teams: (leagueId, season) => `teams?league=${leagueId}&season=${season}`,
    statistics: (leagueId, season, id) => `teams/statistics?league=${leagueId}&season=${season}&team=${id}`,
    leagues: '/leagues',
    standings: (leagueId, season) => `/standings?league=${leagueId}&season=${season}`,
    fixtureRounds: (leagueId, season) => `fixtures/rounds?league=${leagueId}&season=${season}`,
    fixtures: (leagueId, season) => `fixtures?league=${leagueId}&season=${season}`,
};

module.exports = routes;
