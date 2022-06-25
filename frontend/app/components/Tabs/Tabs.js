import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './TabsStyle';
import setGradients from '../../utils/setGradients';

const Tabs = ({ tabs, state }) => (
    <View style={styles.tabList}>
        {tabs.map((tab, index) => (
            <LinearGradient
                key={tab.id}
                colors={state === tab.id ? setGradients(index) : ['#6C6C6C', '#6C6C6C']}
                style={styles.tab}
            >
                <Text style={[styles.tabText, state === tab.id ? styles.tabTextActive : '']}>{tab.title}</Text>
            </LinearGradient>
        ))}
    </View>
);

export default Tabs;
