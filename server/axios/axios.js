const axios = require('axios');
const Leagues = require('../model/Leagues');
const SeasonTeams = require('../model/SeasonTeams');
const API_ROUTE = 'v3.football.api-sports.io';
const API_KEY = '3e0607f5006ef6cb6a14b11c84554d48'; // API KEY
const LEAGUES_ID = [39];
const routes = require('./routes');
// const apiRouteLeagues = 'https://api.football-data.org/v4/competitions/PL';
// 61 - Liga 1, 135 - Seria A, 39 -Premier League, 78 - Bundesliga
// 88 - Eredivisie, 94 - Primeira Liga(Portugal), 140 - La Liga
// 4 - Euro, 1 - World Cup

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
    .then(async(res) => {
        const { data: { response } } = res;

        const duplicate = await SeasonTeams.findOne({ leagueId: leagueId, season: season }).exec();

        if (duplicate) {
            console.log('Duplicate team!');
            return;
        }

        let teams = [];
        async function asyncForEach(arr, callback) {
            for (let i = 0; i < arr.length; i++) {
                await callback(arr[i], i, arr);
            }
        };

        function fetchStatistics(obj) {
            return new Promise(resolve => {
                axios.request(axiosOptions(routes.statistics(leagueId, season, obj.team.id)))
                .then(async(res) => {
                    const { data: dataTeams } = res;
                    const newObj = {...obj};
                    newObj.statistics = dataTeams.response;
                    teams = [...teams, newObj];
                    resolve(true);
                })
                .catch(err => {
                    console.log(err);
                })
            });
        };

        // Async forEach
        asyncForEach(response, async (value) => {
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

// Загрузка определенной лиги
const downloadLeagues = (leagueId = LEAGUES_ID[0]) => {
    axios.request(axiosOptions(`leagues?id=${leagueId}`))
    .then(async function (res) {
        const { data: { response } } = res;
        const duplicate = await Leagues.findOne({ 'league.id': response[0].league.id }).exec();

        if (duplicate) {
            console.log('Duplicate id!');
            return;
        }

        const { league, country, seasons } = res.data.response[0];

        try { // создание одной лиги в БД
            await Leagues.create({
                league,
                country,
                seasons,
            });
        } catch (error) {
            console.log(error)
        }

    }).catch(function (error) {
        console.error(error);
    });
}

const downloadData = () => {
    // TODO совместить, чтобы получать информацию синхронно
    downloadTeams();
    downloadLeagues();
};

module.exports = downloadData;
