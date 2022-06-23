import React, { useState, useEffect, useCallback } from 'react';
import {
    View, FlatList, Text, TouchableHighlight, ImageBackground, ActivityIndicator,
} from 'react-native';
import apiMethods from '../../../api/methods';
import { apiRoute, AUTH_TOKEN } from '../../../api/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { setGradients } from '../../utils/setGradients';
import { styles } from './HomeStyles';
import { COLORS } from '../../constants/constants';
import request from '../../utils/request';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import { Icons, Backgrounds } from './Images';

const getBg = code => {
    const path = Backgrounds[code]?.uri;
    if (!path) return Backgrounds.WC.uri;
    return path;
};

const Icon = ({ code, style}) => {
    let newCode = code;
    if (
        typeof newCode !== 'string' || !Icons[`${newCode}Icon`]
    ) newCode = 'PL';

    const Component = Icons[`${newCode}Icon`];
    return <Component style={style} />;
};

export default function Home({ navigation }) {
    const [leagues, setLeagues] = useState(null);
    const [error, setError] = useState(''); // TODO - create error Modal!
    const numColumns = 2;
    const initialNumToRender = 8;

    useEffect(() => { // Запрос лиг
        if (!leagues) {
            const fetchData = async () => {
                const { data, status, error } = await request(`${apiRoute}${apiMethods.leagues}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth-Token': AUTH_TOKEN,
                    }
                });

                if (status && (status < 400)) {
                    setLeagues(data);
                } else {
                    setError(error.message);
                }
            }

            fetchData();
        }
    }, []);

    const onPressEventNavagate = useCallback((item) => {
        let Page = 'League';

        if (item.type === 'CUP') Page = 'Cup';

        navigation.navigate(
            Page, { eventId: item.code, eventName: item.name }
        );
        console.log(Page);
    }, []);

    // console.log(leagues);

    return (
        <MainBg>
            <Padding>
                {leagues?.competitions ? (
                    <FlatList
                        initialNumToRender={initialNumToRender}
                        contentContainerStyle={{ paddingBottom: 20, paddingVertical: 38 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        keyExtractor={(item => item.id)}
                        data={leagues.competitions}
                        numColumns={numColumns}
                        renderItem={({ item, index }) => (
                            <TouchableHighlight
                                key={item.id}
                                onPress={() => onPressEventNavagate(item)}
                            >
                                <View style={styles.slide}>
                                    <LinearGradient 
                                        colors={setGradients(index)}
                                        style={styles.gradient}
                                    />
                                    <ImageBackground
                                        source={getBg(item.code)}
                                        resizeMode="cover"
                                        style={styles.background}
                                    />
                                    <View style={styles.textWrap}>
                                        <Icon code={item.code} style={styles.image} />
                                        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color={COLORS.indicator} />
                    </View>
                )}
            </Padding>
        </MainBg>
    )
};
