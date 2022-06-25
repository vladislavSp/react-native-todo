import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, SectionList } from 'react-native';
import { API_URL } from '../../../api/constants';
import apiMethods from '../../../api/methods';
import request from '../../utils/request';
import Loading from '../Loading/Loading';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import Tabs from '../Tabs/Tabs';
import { styles } from './CupStyles';

const TABS = [{
    id: 0,
    title: 'Групповой этап',
}, {
    id: 1,
    title: 'Раунд плей-офф',
}, {
    id: 2,
    title: 'Статистика турнира',
}];

const Cup = ({ route }) => {
    const { eventId, season } = route.params;
    const [info, setInfo] = useState([]);
    const [error, setError] = useState();
    const [currentSeason, setSeasons] = useState(season);
    const [tabState, setTabState] = useState(TABS[0].id);

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

    if (!info || !info?.length) <Loading />;

    const StatsHeader = ({ title }) => (
        <View style={styles.statsHeader}>
            <Text style={styles.groupTitle}>{title}</Text>
            <View style={styles.headerGroup}>
                <Text
                    style={[styles.statText, styles.firstHeaderText]}
                >
                    Игры
                </Text>
                <Text style={[styles.statText, styles.winText]}>
                    В
                </Text>
                <Text style={[styles.statText, styles.drawText]}>
                    Н
                </Text>
                <Text style={[styles.statText, styles.loseText]}>П</Text>
                <Text
                    style={[styles.statText, styles.lastHeaderText]}
                >
                    Очки
                </Text>
            </View>
        </View>
    );

    return (
        <MainBg>
            <Padding top={38}>
                <Tabs tabs={TABS} state={tabState} />
                <View style={{ paddingBottom: 70 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(_, index) => index}
                        data={info}
                        renderItem={({ item }) => (
                            <View style={styles.groupBlock}>
                                <StatsHeader title={item[0]?.group} />
                                {item.map((team, i) => (
                                    <View
                                        style={styles.groupRow}
                                        key={`${team?.team.name}${Math.random()}`}
                                    >
                                        <Text style={styles.numberTeam}>{`${i + 1}.`}</Text>
                                        <Text
                                            style={styles.nameTeam}
                                            ellipsizeMode="tail"
                                            numberOfLines={1}
                                        >
                                            {team?.team?.name}
                                        </Text>
                                        <View style={styles.stats}>
                                            <Text
                                                style={[styles.statText, styles.firstHeaderText]}
                                            >
                                                {team?.all?.played}
                                            </Text>
                                            <Text style={[styles.statText, styles.winText]}>
                                                {team?.all?.win}
                                            </Text>
                                            <Text style={[styles.statText, styles.drawText]}>
                                                {team?.all?.draw}
                                            </Text>
                                            <Text style={[styles.statText, styles.loseText]}>
                                                {team?.all?.lose}
                                            </Text>
                                            <Text style={[styles.statBigText, styles.lastHeaderText]}>
                                                {team?.points}
                                            </Text>
                                        </View>
                                        
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
