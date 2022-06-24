import React from 'react';
import { COLORS } from '../../constants/constants';
import { ActivityIndicator, View } from 'react-native';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';

const Loading = () => {
    return (
        <MainBg>
            <Padding>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
            </Padding>
        </MainBg>
    )
};

export default Loading;
