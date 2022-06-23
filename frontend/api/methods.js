export const apiMethods = {
    // leagues: `/leagues`,
    // seasonWithTeams: (leagueId, season) => `/teams?leagueId=${leagueId}&season=${season}`,
    leagues: `/competitions`,
    leagueMain: (id, season = 2021) => `/competitions/${id}/standings?season=${season}`,
    cupMatches: (
        id, stage = 'GROUP_STAGE', season = 2021,
    ) => `/competitions/${id}/matches?season=${season}&stage=${stage}&group=GROUP_A`,
};

// чтобы узнать у кубка матчи - нужно отправить запрос по сезону и по stage
// доступные стейджы 
// FINAL | THIRD_PLACE | SEMI_FINALS | QUARTER_FINALS | LAST_16 | LAST_32 | LAST_64 | ROUND_4 | ROUND_3 | ROUND_2 | ROUND_1 | GROUP_STAGE | PRELIMINARY_ROUND | QUALIFICATION | QUALIFICATION_ROUND_1 | QUALIFICATION_ROUND_2 | QUALIFICATION_ROUND_3 | PLAYOFF_ROUND_1 | PLAYOFF_ROUND_2 | PLAYOFFS | REGULAR_SEASON | CLAUSURA | APERTURA | CHAMPIONSHIP_ROUND | RELEGATION_ROUND


export default apiMethods;
