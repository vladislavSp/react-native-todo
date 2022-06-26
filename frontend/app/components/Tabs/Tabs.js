import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './TabsStyle';
import setGradients from '../../utils/setGradients';

const Tabs = ({ tabs, state, changeTabs }) => (
    <View style={styles.tabList}>
        {tabs.map((tab, index) => (
            <Pressable style={styles.tabBtn} onPress={() => changeTabs(tab.id)}>
                <LinearGradient
                    style={styles.gradient}
                    key={tab.id}
                    colors={state === tab.id ? setGradients(index) : ['#6C6C6C', '#6C6C6C']}
                >
                    <Text style={[styles.tabText, state === tab.id ? styles.tabTextActive : '']}>{tab.title}</Text>
                </LinearGradient>
            </Pressable>
        ))}
    </View>
);

export default Tabs;
