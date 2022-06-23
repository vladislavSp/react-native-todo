import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { apiRoute, AUTH_TOKEN } from '../../../api/constants';
import apiMethods from '../../../api/methods';
import request from '../../utils/request';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';

const Cup = ({ route }) => {
    const { eventId } = route.params;
    const [info, setInfo] = useState([]);
    const [cupStage, setCupStage] = useState('GROUP_STAGE');

    useEffect(() => {
        const fetchData = async () => {
            const {
                data, status, error,
            } = await request(`${apiRoute}${apiMethods.cupMatches(eventId, cupStage)}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': AUTH_TOKEN,
                },
            });

            // console.log(data, status, error);

            if (status < 400) {
                setInfo(data);
            } else {
                console.log(error);
            }

        }

        // fetchData();
    }, []);

    console.log(info.matches.map(el => el.homeTeam.name));

    return (
        <MainBg>
            <Padding top={38}>
                <View>
                    <Text style={{color: '#fff'}}>{eventId}</Text>
                </View>
            </Padding>
        </MainBg>
    )
}

export default Cup;
