import React, { useLayoutEffect } from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home/Home';
import Details from '../components/Details/Details';
import getHeaderTitle from '../utils/getHeaderTitle';

const Stack = createNativeStackNavigator();

const HomeNavigation = ({ route, navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route, navigation, 'Sport time') });
    }, [navigation, route]);

    return (
        <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen
                name="Details"
                component={Details}
                // initialParams={{ itemName: 'Premier League' }}
            />
        </Stack.Navigator>
    );
};

export default HomeNavigation;
