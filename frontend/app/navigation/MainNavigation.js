import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeNavigation from './HomeNavigation';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import styles from '../AppStyles';

const Tab = createBottomTabNavigator();

const MainNavigation = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarStyle: styles.tabBar,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerStatusBarHeight: 70,
            headerShadowVisible: false, // убирает бордер на нижней границе header
        }}
    >
        <Tab.Screen
            name="Football time"
            component={HomeNavigation}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="settings" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainNavigation;
