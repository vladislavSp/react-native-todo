import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../api/constants';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import request from '../../utils/request';
import apiMethods from '../../../api/methods';
import Tabs from '../Tabs/Tabs';
import Standings from './Standings/Standings';
import Shedule from './Shedule/Shedule';
import { Text, View } from 'react-native';

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
    const { eventId, season: currentSeason } = route.params;
    const [season, setSeason] = useState(currentSeason);
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

    const changeTabs = id => setTabState(id);

    // Обработать ошибку TODO
    if (!teams) return null;

    return (
        <MainBg>
            <Padding top={38}>
                <Tabs tabs={TABS} state={tabState} changeTabs={changeTabs} />

                {tabState === TABS[0].id && (
                    <Standings standings={teams?.league?.standings} />
                )}

                {tabState === TABS[1].id && (
                    <Shedule season={season} eventId={eventId} />
                )}

                {tabState === TABS[2].id && (
                    <View>
                        <Text style={{color: '#fff'}}>Статистика игроков</Text>
                    </View>
                )}
            </Padding>
        </MainBg>
    );
};

export default League;
