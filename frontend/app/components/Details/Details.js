import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, Button } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { API_URL } from '../../../api/constants';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import request from '../../utils/request';
import apiMethods from '../../../api/methods';
import setGradients from '../../utils/setGradients';
import { FlatList } from 'react-native-gesture-handler';

const TABS = [{
    id: 0,
    title: 'Турнирная таблица',
}, {
    id: 1,
    title: 'Расписание матчей',
}, {
    id: 2,
    title: 'Статистика игроков',
}];

// Страница для динамических данных
const Details = ({ route, navigation }) => {
    const { leagueId, itemName, currentYear } = route.params;
    const [teams, setTeams] = useState([]);
    const [tabState, setTabState] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            const {
                data, status, error,
            } = await request(`${API_URL}${apiMethods.seasonWithTeams(leagueId, currentYear)}`);

            if (status < 400) setTeams(data.teams);
            else {
                setError(error);
            }
        }

        fetchTeams();
    }, []);

    return (
        <MainBg>
            <Padding>
                <View style={styles.tabList}>
                    {TABS.map((tab, index) => (
                        <LinearGradient 
                            key={tab.id}
                            colors={tabState === tab.id ? setGradients(index) : ['#6C6C6C', '#6C6C6C']}
                            style={styles.tab}
                        >
                            <Text style={[styles.tabText, tabState === tab.id ? styles.tabTextActive : '']}>{tab.title}</Text>
                        </LinearGradient>
                    ))}
                </View>

                <View style={styles.headerTable}>
                    <Text style={[styles.tableText, styles.tableTextFirst]}>№</Text>
                    <Text style={styles.tableText}>Команда</Text>
                </View>

                {!teams.length ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <FlatList
                        keyExtractor={(item) => item.team.id}
                        data={teams}
                        renderItem={({ item}) => (
                            <View style={styles.tableRow}>
                                <Text style={styles.tableRowText}>{item.team.name}</Text>
                            </View>
                        )}
                    />
                )}
            </Padding>
        </MainBg>
    )
};

export default Details;
