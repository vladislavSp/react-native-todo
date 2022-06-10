import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import useDownload from './app/hooks/useDownload';
import useStateCallback from "./app/hooks/useStateCallback";
import AuthNavigation from './app/navigation/AuthNavigation';
import MainNavigation from './app/navigation/MainNavigation';

export default function App() {
    const [auth, setAuth] = useStateCallback(false);
    const [fontLoad, onLayoutRootView] = useDownload(false);

    useEffect(() => setAuth(false), []);

    if (!fontLoad) return null;
    return (
        <NavigationContainer onReady={onLayoutRootView}>
            {!auth ?  <AuthNavigation /> : <MainNavigation /> }
        </NavigationContainer>
    );
}
