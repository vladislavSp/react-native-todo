import React, { useEffect, useMemo, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View } from 'react-native';
import { setGradients } from '../../../utils/setGradients';
import { API_URL } from '../../../../api/constants';
import apiMethods from '../../../../api/methods';
import request from '../../../utils/request';
import { styles } from './SheduleStyle';

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

    useEffect(() => {
        const fetchMatches = async () => {
            const url = `${API_URL}${apiMethods.fixtures(eventId, 2022, 1)}`;

            const { data, status, error } = await request(url);

            if (status < 400) {
                setMatches(data?.fixtures);
            } else {
                setError(error?.message);
            }
        }

        fetchMatches();
    }, []);

    const dateSortMatches = useMemo(() => {
        // return matches.
        return null;
    }, [matches]);

    return (
        <FlatList
            contentContainerStyle={{ paddingTop: 10 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            data={matches}
            renderItem={({ item }) => {
                const { teams, goals, fixture } = item;
                const date = new Date(fixture.date);
                const hours = date.getHours();
                const minutes = date.getMinutes();

                return (
                    <View style={{ width: '47%', flexDirection: 'row'}}>
                        {/* <Text style={styles.title}>{"item.title"}</Text> */}
                        <View style={styles.matchBlock}>
                            <LinearGradient colors={setGradients(5)} style={styles.clock}>
                                <Text style={styles.clockText}>
                                    {`${hours}:${minutes < 10 ? `0${minutes}` : minutes}`}
                                </Text>
                            </LinearGradient>
                            <View style={styles.team}>
                                <Text style={styles.teamText}>{teams.home.name}</Text>
                                <Text style={styles.teamText}>{goals.home || 0}</Text>
                            </View>
                            <View style={styles.team}>
                                <Text style={styles.teamText}>{teams.away.name}</Text>
                                <Text style={styles.teamText}>{goals.home || 0}</Text>
                            </View>
                        </View>
                    </View>
                )
            }}
        />
    );
};

export default Shedule;
