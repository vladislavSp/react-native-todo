import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home/Home';
import Details from '../components/Details/Details';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    );
};

export default HomeNavigation;
