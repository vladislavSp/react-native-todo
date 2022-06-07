import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../components/Home/Home';
import Details from '../components/Details/Details';
import getHeaderTitle from '../utils/getHeaderTitle';

const Stack = createNativeStackNavigator();

const HomeNavigation = ({ route, navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route, navigation, 'Football time') });
    }, [navigation, route]);

    return (
        <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen
                name="Details"
                component={Details}
            />
        </Stack.Navigator>
    );
};

export default HomeNavigation;
