import { useEffect, useCallback } from 'react';
import useStateCallback from './useStateCallback';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export const useDownload = (initialState = false) => {
    const [fontLoad, setFontLoad] = useStateCallback(initialState);

    useEffect(() => {
        async function download() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    'RoadRadio': require('../../assets/fonts/RoadRadio.ttf'),
                    'RoadRadioBlack': require('../../assets/fonts/RoadRadio-Black.ttf'),
                    'RoadRadioBold': require('../../assets/fonts/RoadRadio-Bold.ttf'),
                    'RoadRadioLight': require('../../assets/fonts/RoadRadio-Light.ttf'),
                    'RoadRadioThin': require('../../assets/fonts/RoadRadio-Thin.ttf'),

                });
            } catch (e) {
                console.warn(e);
            } finally {
                setFontLoad(true);
            }
        }
        download();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontLoad) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [fontLoad]);

    return [fontLoad, onLayoutRootView];
};

export default useDownload;
