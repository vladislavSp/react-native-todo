import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => (
    <Stack.Navigator initialRouteName='AuthScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
);

export default AuthNavigation;
