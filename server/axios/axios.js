const axios = require('axios');
const Leagues = require('../model/Leagues');
const SeasonTeams = require('../model/SeasonTeams');
const Standings = require('../model/Standings');
const FixtureRounds = require('../model/FixtureRounds');
const Fixtures = require('../model/Fixtures');
const API_ROUTE = 'v3.football.api-sports.io';
const API_KEY = '3e0607f5006ef6cb6a14b11c84554d48'; // API KEY from api-football.com
const LEAGUES_ID = [39];
const routes = require('./routes');
// const apiRouteLeagues = 'https://api.football-data.org/v4/competitions/PL';
// 61 - Liga 1, 135 - Seria A, 39 -Premier League, 78 - Bundesliga
// 88 - Eredivisie, 94 - Primeira Liga(Portugal), 140 - La Liga
// 4 - Euro, 1 - World Cup, Russia - 235

const axiosOptions = (route) => ({
    method: 'get',
    url: `https://v3.football.api-sports.io/${route}`,
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_ROUTE
    }
});

// Загрузка команд в определенном сезоне
const downloadTeams = (leagueId = 39, season = 2021) => {
    axios.request(axiosOptions(routes.teams(leagueId, season)))
        .then(async (res) => {
            const { data: { response } } = res;

            const duplicate = await SeasonTeams.findOne({ leagueId: leagueId, season: season }).exec();

            if (duplicate) {
                console.log('Duplicate team!');
                return;
            }

            let teams = [];
            async function asyncForEach(arr, callback) {
                for (let i = 0; i < arr.length; i++) {
                    console.log('Циклы итерраций скачивания: ', i);
                    await callback(arr[i], i, arr);
                }
            };

            function fetchStatistics(obj) {
                return new Promise(resolve => {
                    axios.request(axiosOptions(routes.statistics(leagueId, season, obj.team.id)))
                        .then(async (res) => {
                            const { data: dataTeams } = res;
                            const newObj = { ...obj };
                            newObj.statistics = dataTeams.response;
                            teams = [...teams, newObj];
                            resolve(true);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                });
            };

            let newResponse = response.slice(8);
            // Async forEach
            asyncForEach(newResponse, async (value) => {
                await fetchStatistics(value);
            }).then(async () => {
                try {
                    await SeasonTeams.create({
                        leagueId,
                        season: season,
                        teams,
                    });
                } catch (error) {
                    console.log(error);
                }
            });
        })
        .catch(err => {
            console.log(err);
        });
}

// Загрузка таблиц в коллекцию
const downloadStandings = (leagueId = 235, season = 2021) => {
    const options = axiosOptions(routes.standings(leagueId, season));

    axios.request(options)
        .then(async (res) => {
            const { data: { response } } = res;

            const duplicate = await Standings.findOne({
                $or: [{ 'league.id': response[0].league.id, 'league.season': response[0].league.season }]
            }).exec();

            if (duplicate) {
                console.log('Duplicate standings!');
                return;
            }

            const { league } = response[0];

            try {
                await Standings.create({
                    league: {
                        id: league.id,
                        name: league.name,
                        country: league.country,
                        logo: league.logo,
                        flag: league.flag,
                        season: league.season,
                        standings: league.standings,
                    }
                });
                console.log('Standings download: ', leagueId);
            } catch (error) {
                console.log(error);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

// Загрузка лиги с конкретным Id
const downloadLeagues = (leagueId = 235) => {
    axios.request(axiosOptions(`leagues?id=${leagueId}`))
        .then(async function (res) {
            const { data: { response } } = res;
            const duplicate = await Leagues.findOne({ 'league.id': response[0].league.id }).exec();

            if (duplicate) {
                console.log('Duplicate league!');
                return;
            }

            const { league, country, seasons } = res.data.response[0];

            try { // создание одной лиги в БД
                await Leagues.create({
                    league,
                    country,
                    seasons,
                });
                console.log('Download league: ', leagueId);
            } catch (error) {
                console.log(error)
            }

        }).catch(function (error) {
            console.error(error);
        });
}

const downloadFixturesRound = (leagueId = 39, season = 2022) => {
    const options = axiosOptions(routes.fixtureRounds(leagueId, season));

    axios.request(options)
        .then(async function (res) {
            const { data: { response } } = res;

            try { // создание одной лиги в БД
                await FixtureRounds.create({
                    league: leagueId,
                    season,
                    rounds: response,
                });
                console.log('Download rounds: ', leagueId, season);
            } catch (error) {
                console.log(error)
            }

        }).catch(function (error) {
            console.error(error);
        });
}

const downloadFixtures = (leagueId = 39, season = 2022) => {
    const options = axiosOptions(routes.fixtures(leagueId, season));

    axios.request(options)
        .then(async function (res) {
            const { data: { response } } = res;

            try { // создание одной лиги в БД
                await Fixtures.create({
                    league: leagueId,
                    season,
                    fixtures: response,
                });
                console.log('Download fixtures for league: ', leagueId, season);
            } catch (error) {
                console.log(error)
            }

        }).catch(function (error) {
            console.error(error);
        });
}

const downloadData = () => {
    // downloadLeagues();
    // downloadStandings();
    // downloadFixturesRound();
    // downloadTeams();
    // downloadFixtures();
};



module.exports = downloadData;
