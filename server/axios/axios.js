const axios = require('axios');
const apiRouteLeagues = 'https://api.football-data.org/v4/competitions/PL';
// const API_KEY = 'f3660b0dcfbdfce3bfc8676f3ddc4ee3'; // 
//mlSt9nolfJa3Js0I password MongoDB

const instance = axios.create();

const fetchData = () => {
    instance.get(apiRouteLeagues)
    .then(({ data }) => {
        console.log('Then Data: ', data);
        // записать в БД
    })
    .catch(error => {
        console.log('Catch Error: ', error.response.data);
    });
}

module.exports = fetchData;