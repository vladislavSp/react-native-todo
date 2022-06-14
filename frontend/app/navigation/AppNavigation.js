import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../AppStyles';
import useAuth from '../hooks/useAuth';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import { COLORS } from '../constants/constants';

const AppNavigation = () => {
    const { authData, isInitialLoading } = useAuth();

    
    if (isInitialLoading) {
        // isInitialLoading - prevent blink with auth screen
        return (
            <View style={styles.indicatorScreen}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
            </View>
        );
    }

    return (
        authData ? <TabNavigation /> : <AuthNavigation />
    )
};

export default AppNavigation;
