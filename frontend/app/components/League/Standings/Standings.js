import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants/constants';
import { styles } from './StandingsStyle';

const Standings = ({ standings }) => (
    <View>
        <View style={styles.headerTable}>
            <Text style={[styles.tableText, styles.tableTextFirst]}>№</Text>
            <Text style={styles.tableText}>Команда</Text>
            <Text style={[styles.tableText, { marginLeft: 'auto' }]}>Игры</Text>
            <Text style={[styles.tableText, { marginLeft: 11 }]}>В</Text>
            <Text style={[styles.tableText, { marginLeft: 11 }]}>Н</Text>
            <Text style={[styles.tableText, { marginLeft: 11 }]}>П</Text>
            <Text style={[styles.tableText, { marginLeft: 16 }]}>Очки</Text>
        </View>

        {!standings?.length ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
            </View>
        ) : (
            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.rank}
                data={standings[0]}
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
    </View>
);

export default Standings;
