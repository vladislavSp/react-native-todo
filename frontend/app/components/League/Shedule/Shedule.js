import React, { useEffect, useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View } from 'react-native';
import { setGradients } from '../../../utils/setGradients';
import { API_URL } from '../../../../api/constants';
import apiMethods from '../../../../api/methods';
import request from '../../../utils/request';
import { styles } from './SheduleStyle';
import { groupByDate } from '../../../utils/date';

const mockData = [
    {
        title: 'Воскресенье, 26 августа',
        matches: [
            {
                time: '19:00',
                team1: { name: 'Manchester United', count: 1 },
                team2: { name: 'Crystal Palace', count: 0},
            },
            {
                time: '21:00',
                team1: { name: 'Manchester United', count: 1 },
                team2: { name: 'Crystal Palace', count: 0 },
            }],
    },

];

const Shedule = ({ season, eventId }) => {
    const [matches, setMatches] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dateSortMatches = useMemo(() => Object.values(groupByDate(matches)), [matches]);

    useEffect(() => {
        const fetchMatches = async () => {
            const url = `${API_URL}${apiMethods.fixtures(eventId, 2022, 1)}`;

            const { data, status, error } = await request(url);

            if (status < 400) {
                console.log(data?.fixtures.length);
                setMatches(data?.fixtures);
            } else {
                setError(error?.message);
            }
        }

        fetchMatches();
    }, []);

    if (!dateSortMatches.length) return null;

    return (
        <FlatList
            data={dateSortMatches}
            renderItem={({ item }) => {
                const { date, matches } = item || {};
                // const date = new Date(fixture.date);
                // const hours = date.getHours();
                // const minutes = date.getMinutes();
                console.log(item);

                return (
                    <View style={styles.dateBlock}>
                        <Text style={styles.title}>{date}</Text>

                        <View style={styles.matchList}>
                            {matches?.map((match, i) => (
                                <View style={styles.matchBlock} key={i}>
                                    <LinearGradient colors={setGradients(5)} style={styles.clock}>
                                        <Text style={styles.clockText}>
                                            Часы
                                        </Text>
                                    </LinearGradient>
                                    <View style={styles.team}>
                                        <Text style={styles.teamText}>{match?.teams?.home.name}</Text>
                                        <Text style={styles.teamText}>{match?.goals?.home || 0}</Text>
                                    </View>
                                    <View style={styles.team}>
                                        <Text style={styles.teamText}>{match?.teams?.away.name}</Text>
                                        <Text style={styles.teamText}>{match?.goals?.away || 0}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )
            }}
        />
    );
};

export default Shedule;
