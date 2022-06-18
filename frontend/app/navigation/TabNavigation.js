import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeNavigation from './HomeNavigation';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import styles from '../AppStyles';

const Tab = createBottomTabNavigator();

const TabNavigation = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarStyle: styles.tabBar,
            headerStyle: styles.header,
            headerTitleStyle: styles.headerText,
            headerStatusBarHeight: 70,
            headerShadowVisible: false, // убирает бордер на нижней границе header
            tabBarShowLabel: false,
        }}
    >
        <Tab.Screen
            name="Football time"
            component={HomeNavigation}
            options={{
                tabBarLabel: 'Главная',
                tabBarIcon: ({ focused }) => (
                    <Image
                        style={{opacity: focused ? 1 : 0.5, width: 28, height: 28}}
                        source={require('../../assets/images/icons/home-icon.png')}
                    />
                ),
                tabBarShowLabel: false
            }}
        />
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                title: 'Настройки',
                tabBarLabel: 'Настройки',
                tabBarIcon: ({  focused }) => (
                    <Image
                        style={{opacity: focused ? 1 : 0.5, width: 28, height: 28}}
                        source={require('../../assets/images/icons/settings-icon.png')}
                    />
                ),
            }}
        />
    </Tab.Navigator>
);

export default TabNavigation;
