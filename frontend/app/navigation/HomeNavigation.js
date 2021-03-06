import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import getHeaderTitle from '../utils/getHeaderTitle';
import Home from '../components/Home/Home';
import League from '../components/League/League';
import Cup from '../components/Cup/Cup';

const Stack = createNativeStackNavigator();

const HomeNavigation = ({ route, navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route, navigation, 'Football time') });
    }, [navigation, route]);

    return (
        <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen  name="League" component={League} />
            <Stack.Screen  name="Cup" component={Cup} />
        </Stack.Navigator>
    );
};

export default HomeNavigation;
