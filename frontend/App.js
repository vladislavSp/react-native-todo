import React, { useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NotesScreen from './app/components/Notes/Notes';
import HomeNavigation from './app/navigation/HomeNavigation';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import useStateCallback from "./app/hooks/useStateCallback";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './app/AppStyles.js';

const Tab = createBottomTabNavigator();

export default function App() {
    const [fontLoad, setFontLoad] = useStateCallback(false);

    useEffect(() => {
        async function download() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
                    'OpenSans-SemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
                    'PilatExtended-Heavy': require('./assets/fonts/PilatExtended-Heavy.ttf'),
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

    if (!fontLoad) {
        return null;
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#fff',
                    tabBarStyle: styles.tabBar,
                    headerStyle: styles.header,
                    headerTitleStyle: styles.headerText,
                    headerStatusBarHeight: 65,
                    headerShadowVisible: false, // убираем бордер на нижней границе header
                }}
            >
                <Tab.Screen
                    name="Sport time"
                    component={HomeNavigation}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notes"
                    component={NotesScreen}
                    options={{
                        tabBarLabel: 'Notes',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="note" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
  );
}
