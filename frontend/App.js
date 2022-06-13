import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './app/Context/AppContext';
import useDownload from './app/hooks/useDownload';
import AppNavigation from './app/navigation/AppNavigation';

export default function App() {
    const [fontLoad, onLayoutRootView] = useDownload(false);

    if (!fontLoad) return null;
    return (
        <AppProvider>
            <NavigationContainer onReady={onLayoutRootView}>
                <AppNavigation />
            </NavigationContainer>
        </AppProvider>
    );
}
