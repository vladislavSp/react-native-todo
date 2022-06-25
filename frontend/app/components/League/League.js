import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
import { API_URL } from '../../../api/constants';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import request from '../../utils/request';
import apiMethods from '../../../api/methods';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../../constants/constants';
import Tabs from '../Tabs/Tabs';

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
    const [tabState, setTabState] = useState(TABS[0].id);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStanding = async () => {
            const url = `${API_URL}${apiMethods.standings(eventId, season)}`;
            const { data, status, error } = await request(url);

            if (status < 400) setTeams(data);
            else setError(error);
        }

        fetchStanding();
    }, []);

    return (
        <MainBg>
            <Padding top={38}>
                <Tabs tabs={TABS} state={tabState} />
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
                        showsVerticalScrollIndicator={false}
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
