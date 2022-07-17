const axios = require('axios');
const Leagues = require('../model/Leagues');
const SeasonTeams = require('../model/SeasonTeams');
const Standings = require('../model/Standings');
const TestModel = require('../model/TestModel');
const FixtureRounds = require('../model/FixtureRounds');
const Fixtures = require('../model/Fixtures');
const API_ROUTE = 'v3.football.api-sports.io';
const API_KEY = '3e0607f5006ef6cb6a14b11c84554d48'; // API KEY from api-football.com
const routes = require('./routes');
const LEAGUES_ID = [39];
// const apiRouteLeagues = 'https://api.football-data.org/v4/competitions/PL';
// 61 - Liga 1, 135 - Seria A, 39 -Premier League, 78 - Bundesliga
// 88 - Eredivisie, 94 - Primeira Liga(Portugal), 140 - La Liga
// 4 - Euro, 1 - World Cup, 235 - Russia, 2 - Champions League

const axiosOptions = (route) => ({
    method: 'get',
    url: `https://v3.football.api-sports.io/${route}`,
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_ROUTE
    }
});

const createOptions = { upsert: true, new: true, setDefaultsOnInsert: true }; // опции обновления

const callbackFc = (error, result) => {
    if (error) {
        console.log('Error: ' ,error);
        return;
    }
    console.log('Create or update: ', result);
}

// Загрузка таблиц в коллекцию
const downloadStandings = (leagueId = 235, season = 2022) => {
    const options = axiosOptions(routes.standings(leagueId, season));

    axios.request(options)
    .then(async (res) => {
        const { data: { response } } = res;
        const { league } = response[0];

        if (!league) return;

        try {
            const query = { 'league.id': league.id, 'league.season': league.season };
            const update = {
                league: {
                    id: league.id,
                    name: league.name,
                    country: league.country,
                    logo: league.logo,
                    flag: league.flag,
                    season: league.season,
                    standings: league.standings,
                }
            };
            Standings.findOneAndUpdate(query, update, createOptions, callbackFc);
        } catch (error) {
            console.log(error);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

// Загрузка лиги с конкретным Id
const downloadLeagues = (leagueId = 140) => {
    axios.request(axiosOptions(`leagues?id=${leagueId}`))
    .then(async function (res) {
        const { data: { response } } = res;
        const { league, country, seasons } = res.data.response[0];

        try { // создание одной лиги в БД
            const query = { 'league.id': response[0].league.id };
            const update = { league, country, seasons };
            Leagues.findOneAndUpdate(query, update, createOptions, callbackFc);
        } catch (error) {
            console.log(error);
        }
    }).catch(function (error) {
        console.error(error);
    });
}

// Раунды в определенном соревновании
const downloadFixturesRound = (leagueId = 39, season = 2022) => {
    const options = axiosOptions(routes.fixtureRounds(leagueId, season));

    axios.request(options)
    .then(async function (res) {
        const { data: { response } } = res;

        try { // создание одной лиги в БД
            const query = { league: leagueId, season: season };
            const update = { league: leagueId, season, rounds: response };
            FixtureRounds.findOneAndUpdate(query, update, createOptions, callbackFc);
        } catch (error) {
            console.log(error)
        }
    }).catch(function (error) {
        console.error(error);
    });
}

// Расписание
const downloadFixtures = (leagueId = 2, season = 2022) => {
    const options = axiosOptions(routes.fixtures(leagueId, season));

    axios.request(options)
    .then(async function (res) {
        const { data: { response } } = res;

        try {
            const query = { league: leagueId, season: season };
            const update = { league: leagueId, season, fixtures: response };
            Fixtures.findOneAndUpdate(query, update, createOptions, callbackFc);
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
    // downloadFixtures();
};

module.exports = downloadData;
