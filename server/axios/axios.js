// const axios = require('axios');
// const apiRouteLeagues = 'https://api.football-data.org/v4/competitions/PL';
const API_ROUTE = 'v3.football.api-sports.io';
const API_KEY = '3e0607f5006ef6cb6a14b11c84554d48'; // API KEY

const request = require('request');

// const instance = axios.create();

// const fetchData = () => {
//     instance.get(apiRouteLeagues, {
//         params: { token: '78d0e4f29d8c4257ad382664a0d2bc43'}
//     })
//     .then(({ data }) => {
//         console.log('Then Data: ', data);
//         // to DB
//     })
//     .catch(error => {
//         console.log('Catch Error: ', error.response.data);
//     });
// }

// const axiosDownload = () => {
//     const options = {
//         method: 'GET',
//         url: 'https://api-football-v1.p.rapidapi.com/v3/timezone',
//         headers: {
//             'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
//             'X-RapidAPI-Key': 'dcaa7bce78mshfc45d3a0304429bp11c128jsnf64e862f1308'
//         }
//     };

//     axios.request(options)
//     .then(function (res) {
//         console.log(res);
//     }).catch(function (error) {
//         console.error(error);
//     });
// }

const fc = () => {
    const options = {
        method: 'GET',
        url: `${API_ROUTE}/leagues`,
        headers: {
            'x-rapidapi-host': API_ROUTE,
            'x-rapidapi-key': API_KEY
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        const json = JSON.parse(body);
        console.log(json.response, response);
    });
}
module.exports = fc;

// {
//     "area": {
//         "code": "AFR",
//         "flag": null,
//         "id": 2001,
//         "name": "Africa"
//     },
//     "code": "QCAF",
//     "currentSeason": {
//         "id": 555,
//         "currentMatchday": 6,
//         "startDate": "2019-09-04",
//         "endDate": "2021-11-16",
//         "winner": null
//     },
//     "emblem": null,
//     "id": 2006,
//     "lastUpdated": "2022-03-13T18:51:44Z",
//     "name": "WC Qualification CAF",
//     "numberOfAvailableSeasons": 2,
//     "plan": "TIER_FOUR",
//     "type": "CUP"
// }
