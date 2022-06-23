import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { apiRoute, AUTH_TOKEN } from '../../../api/constants';
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
    const { leagueId } = route.params;
    const [teams, setTeams] = useState([]);
    const [tabState, setTabState] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            const {
                data, status, error,
            } = await request(`${apiRoute}${apiMethods.leagueMain(leagueId, 2021)}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': AUTH_TOKEN,
                    }
                });

            if (status < 400) setTeams(data);
            else setError(error);
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
                    <Text style={[styles.tableText, { marginLeft: 'auto' }]}>Игры</Text>
                    <Text style={[styles.tableText, { marginLeft: 11 }]}>В</Text>
                    <Text style={[styles.tableText, { marginLeft: 11 }]}>Н</Text>
                    <Text style={[styles.tableText, { marginLeft: 11 }]}>П</Text>
                    <Text style={[styles.tableText, { marginLeft: 16 }]}>Очки</Text>
                </View>

                {!teams?.standings?.length ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={COLORS.indicator} />
                    </View>
                ) : (
                    <FlatList
                        keyExtractor={(item) => item.team.id}
                        data={teams.standings[0].table}
                        renderItem={({ item }) => {
                            const { position, team, playedGames, won, draw, lost, points } = item;
                            return (
                                <View style={styles.tableRow}>
                                    <View style={styles.substrate}>
                                        <Text style={styles.tableRowText}>{position}</Text>
                                    </View>
                                    <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.tableRowText, styles.tableRowName]}>
                                        {team.name}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowGame]}>
                                        {playedGames}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowWon]}>
                                        {won}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowDraw]}>
                                        {draw}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowSmallText, styles.tableRowLost]}>
                                        {lost}
                                    </Text>
                                    <Text style={[styles.tableRowText, styles.tableRowPoints ]}>
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
