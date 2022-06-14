import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './app/context/AuthContext';
import useDownload from './app/hooks/useDownload';
import AppNavigation from './app/navigation/AppNavigation';

export default function App() {
    const [fontLoad, onLayoutRootView] = useDownload(false);

    if (!fontLoad) return null;
    return (
        <AuthProvider>
            <NavigationContainer onReady={onLayoutRootView}>
                <AppNavigation />
            </NavigationContainer>
        </AuthProvider>
    );
}
