import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View } from 'react-native';
import { setGradients } from '../../../utils/setGradients';
import { styles } from './SheduleStyle';

const mockData = [
    {
        title: 'Воскресенье, 26 августа',
        matches: [{ time: '19:00', team1: { name: 'Manchester United', count: 1 }, team2: { name: 'Crystal Palace', count: 0} }, { time: '21:00', team1: { name: 'Manchester United', count: 1 }, team2: { name: 'Crystal Palace', count: 0 } }],
    },

];

const Shedule = () => (
    <FlatList
        data={mockData}
        renderItem={({ item }) => {
            const { matches } = item;

            return (
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.matchesGrid}>
                        {matches.map(m => (
                            <View style={styles.matchBlock}>
                                <LinearGradient colors={setGradients(5)} style={styles.clock}>
                                    <Text style={styles.clockText}>{m.time}</Text>
                                </LinearGradient>
                                <View style={styles.teams}>
                                    <View style={styles.team}>
                                        <Text style={styles.teamText}>{m.team1.name}</Text>
                                         <Text style={styles.teamText}>{m.team1.count}</Text>
                                    </View>
                                    <View style={styles.team}>
                                        <Text style={styles.teamText}>{m.team2.name}</Text>
                                         <Text style={styles.teamText}>{m.team2.count}</Text>
                                    </View>
                                </View>
                                
                            </View>
                        ))}
                    </View>
                </View>
            )
        }}
    />
);

export default Shedule;
