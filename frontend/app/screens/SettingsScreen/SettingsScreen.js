import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import MainBg from '../../components/MainBg/MainBg';
import Padding from '../../components/Padding/Padding';
import { STRINGS } from '../../constants/constants';
import { getData } from '../../utils/storeUtils';

const SettingsScreen = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        const setUserData = async () => {
            const user = await getData(STRINGS.userData);
            setUser(user);
        }

        setUserData();
    }, []);

    return (
        <MainBg>
            <Padding>
                <View style={{ paddingVertical: 38 }}>
                    <Text style={{ color: '#fff', marginBottom: 20 }}>Настройки</Text>
                    <Text style={{ color: '#fff', marginBottom: 16 }}>Привет, {user?.name}!</Text>
                    <Text style={{ color: '#fff' }}>Твой email прямиком из базы данных: {user?.email}</Text>
                </View>
            </Padding>
        </MainBg>
    );
}

export default SettingsScreen;
