import React from 'react';
import { Text, View } from 'react-native';
import MainBg from '../../components/MainBg/MainBg';
import Padding from '../../components/Padding/Padding';

const SettingsScreen = ({ params }) => (
    <MainBg>
        <Padding>
            <Text style={{ color: '#fff' }}>Settings Screen</Text>
        </Padding>
    </MainBg>
);

export default SettingsScreen;
