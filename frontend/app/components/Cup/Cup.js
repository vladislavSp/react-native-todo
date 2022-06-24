import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { API_URL, API_MAC_URL } from '../../../api/constants';
import apiMethods from '../../../api/methods';
import request from '../../utils/request';
import Loading from '../Loading/Loading';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';

const Cup = ({ route }) => {
    const { eventId, eventName, season } = route.params;
    const [info, setInfo] = useState([]);
    const [error, setError] = useState();
    const [currentSeason, setSeasons] = useState(season);

    useEffect(() => {
        const fetchInfo = async () => {
            const url = `${API_URL}${apiMethods.standings(eventId, currentSeason)}`;
            const { data, status, error } = await request(url);

            if (status < 400) {
                setInfo(data?.league?.standings);
                // console.log(data);
            } else {
                setError(error.message);
            }

        }

        fetchInfo();
    }, []);

    if (!info.length) <Loading />;

    return (
        <MainBg>
            <Padding top={38}>
                <View>
                    <Text style={{ color: '#fff', marginBottom: 20 }}>Соревнование {eventName}!</Text>
                    <FlatList
                        keyExtractor={(_, index) => index}
                        data={info}
                        renderItem={({ item }) => (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{ color: '#fff'}}>{item[0]?.group}</Text>
                                {item.map((team, i) => (
                                    <View
                                        key={`${team?.team.name}${Math.random()}`}
                                        style={{backgroundColor: '#282A31'}}
                                    >
                                        <Text style={{color: '#fff'}}>{team?.team?.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    />
                </View>
            </Padding>
        </MainBg>
    )
}

export default Cup;
