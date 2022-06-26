import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../api/constants';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import request from '../../utils/request';
import apiMethods from '../../../api/methods';
import Tabs from '../Tabs/Tabs';
import Standings from './Standings/Standings';

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

    // Обработать ошибку TODO
    if (!teams) return null;

    const changeTabs = id => {
        setTabState(id);
    }

    return (
        <MainBg>
            <Padding top={38}>
                <Tabs tabs={TABS} state={tabState} changeTabs={changeTabs} />
                {tabState === TABS[0].id && (
                    <Standings standings={teams?.league?.standings} />
                )}
            </Padding>
        </MainBg>
    );
};

export default League;
