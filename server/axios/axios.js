const axios = require('axios');
const Leagues = require('../model/Leagues');
const Teams = require('../model/Teams');
const API_ROUTE = 'v3.football.api-sports.io';
const API_KEY = '3e0607f5006ef6cb6a14b11c84554d48'; // API KEY
const LEAGUES_ID = [39];
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

const downloadTeams = (leagueId = 39, season = 2021) => {
    axios.request(axiosOptions(`teams?league=${leagueId}&season=${season}`))
    .then(async(res) => {
        const { data: { response } } = res;

        const duplicate = await Teams.findOne({ leagueId: leagueId, season: season }).exec();

        if (duplicate) {
            console.log('Duplicate team!');
            return;
        }

        try {
            await Teams.create({
                leagueId,
                season: season,
                teams: response,
            });
        } catch (error) {
            console.log(error);
        }

    })
    .catch(err => {
        console.log(err);
    });
}

const downloadData = () => {
    axios.request(axiosOptions(`leagues?id=${LEAGUES_ID[0]}`))
    .then(async function (res) {
        const { data: { response } } = res;
        const duplicate = await Leagues.findOne({ 'league.id': response[0].league.id }).exec();

        downloadTeams();
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
};

module.exports = downloadData;
