import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { apiRoute } from '../../api/constants';

export default function News() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Запрос лиг
        const fetchData = async () => {
            try {
                // leagues?id=39
                const url = `${apiRoute}/leagues`;
                const data = await fetch(url, {
                    "Content-Type": "application/json",
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "v3.football.api-sports.io",
                        "x-apisports-key": "f3660b0dcfbdfce3bfc8676f3ddc4ee3"
                    }
                });
                const { response } = await data.json();
                setData(response);
            } catch (error) {
                console.warn(error);
            }
        };

        // fetchData();

        // fetch('https://datahub.io/sports-data/english-premier-league/datapackage.json', {
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        // })
        // .then(data => data.json()
        // .then(json => setData(json))
        // )
        // .catch(e => {
        //     console.warn(e);
        // });
    }, []);

    console.log(data);

    // if (data.length === 0) {
    //     return <LoadingScreen></LoadingScreen>
    // }

    return (
        <View>
            <Text>News!</Text>
        </View>
    )
}