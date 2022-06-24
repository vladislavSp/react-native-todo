import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { apiRoute, API_MAC_URL, AUTH_TOKEN } from '../../../api/constants';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import request from '../../utils/request';
import apiMethods from '../../../api/methods';
import setGradients from '../../utils/setGradients';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/constants';

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
const League = ({ route }) => {
    const [season, setSeason] = useState(2021);
    const { eventId } = route.params;
    const [teams, setTeams] = useState([]);
    const [tabState, setTabState] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStanding = async () => {
            const url = `${API_MAC_URL}${apiMethods.leagueStandings(eventId, season)}`;
            const { data, status, error } = await request(url);

            console.log('Standings: ', data);

            if (status < 400) setTeams(data);
            else setError(error);
        }

        fetchStanding();
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
                    <Text style={[styles.tableText, { marginLeft: 'auto' }]}>Игры</Text>
                    <Text style={[styles.tableText, { marginLeft: 11 }]}>В</Text>
                    <Text style={[styles.tableText, { marginLeft: 11 }]}>Н</Text>
                    <Text style={[styles.tableText, { marginLeft: 11 }]}>П</Text>
                    <Text style={[styles.tableText, { marginLeft: 16 }]}>Очки</Text>
                </View>

                {!teams?.league?.standings[0]?.length ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={COLORS.indicator} />
                    </View>
                ) : (
                    <FlatList
                        keyExtractor={(item) => item.rank}
                        data={teams.league.standings[0]}
                        renderItem={({ item }) => {
                            const { rank, team, all, points } = item;
                            return (
                                <View style={styles.tableRow}>
                                    <View style={styles.substrate}>
                                        <Text style={styles.tableRowText}>{rank}</Text>
                                    </View>
                                    <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.tableRowText, styles.tableRowName]}>
                                        {team.name}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowGame]}>
                                        {all.played}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowWon]}>
                                        {all.win}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowDraw]}>
                                        {all.draw}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowLost]}>
                                        {all.lose}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowPoints]}>
                                        {points}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                )}
            </Padding>
        </MainBg>
    )
};

export default League;
