import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './app/Context/AppContext';
import useDownload from './app/hooks/useDownload';
import AuthNavigation from './app/navigation/AuthNavigation';
import MainNavigation from './app/navigation/MainNavigation';
import useStateCallback from './app/hooks/useStateCallback';

export default function App() {
    const [auth, setAuth] = useStateCallback(false);
    const [fontLoad, onLayoutRootView] = useDownload(false);

    if (!fontLoad) return null;
    return (
        <AppProvider auth={auth} setAuth={setAuth}>
            <NavigationContainer onReady={onLayoutRootView}>
                {!auth ?  <AuthNavigation /> : <MainNavigation /> }
            </NavigationContainer>
        </AppProvider>
    );
}
