import React, { useState, useEffect, useCallback } from 'react';
import {
    View, FlatList, Text, TouchableHighlight, ImageBackground, Image,
} from 'react-native';
import apiMethods from '../../../api/methods';
import { API_URL } from '../../../api/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { setGradients } from '../../utils/setGradients';
import { styles } from './HomeStyles';
// import { COLORS } from '../../constants/constants';
import request from '../../utils/request';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import { Icons, Backgrounds } from './Images';
import Loading from '../Loading/Loading';

const getBg = code => {
    const path = Backgrounds[code]?.uri;
    if (!path) return Backgrounds.WC.uri;
    return path;
};

const Icon = ({ code, style }) => {
    let newCode = code;
    if (
        typeof newCode !== 'string' || !Icons[`${newCode}Icon`]
    ) newCode = 'PL';

    const Component = Icons[`${newCode}Icon`];
    return <Component style={style} />;
};

export default function Home({ navigation }) {
    const [leagues, setLeagues] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(''); // TODO - create error Modal!
    const numColumns = 2;
    const initialNumToRender = 8;

    const fetchData = useCallback(async () => {
        setLoading(true);
        const url = `${API_URL}${apiMethods.leagues}`;
        const { data, status, error } = await request(url);

        if (status && (status < 400)) {
            setLeagues(data);
        } else {
            setError(error.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // Запрос лиг
        if (!leagues) fetchData();
    }, []);

    const updateInfo = () => {
        fetchData();
    }

    const onPressEventNavagate = useCallback((league) => {
        let Page = 'League';

        if (league.type.toLowerCase() === 'Cup') Page = 'Cup';

        navigation.navigate(
            Page, { eventId: league.id, eventName: league.name }
        );
    }, []);

    if (isLoading) return <Loading />;
    // if (error) return <Error />; TODO

    return (
        <MainBg>
            <Padding>
                {leagues ? (
                    <FlatList
                        initialNumToRender={initialNumToRender}
                        contentContainerStyle={{ paddingBottom: 20, paddingVertical: 38 }}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        keyExtractor={(item => item.league.id)}
                        data={leagues}
                        numColumns={numColumns}
                        renderItem={({ item, index }) => (
                            <TouchableHighlight
                                key={item.league.id}
                                onPress={() => onPressEventNavagate(item.league)}
                            >
                                <View style={styles.slide}>
                                    <LinearGradient
                                        colors={setGradients(index)}
                                        style={styles.gradient}
                                    />
                                    {/* <ImageBackground
                                        source={getBg(item.league.name)}
                                        resizeMode="cover"
                                        style={styles.background}
                                    /> */}
                                    <View style={styles.textWrap}>
                                        <Image
                                            source={{ uri: item.league.logo }}
                                            style={styles.image}
                                        />
                                        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.text}>{item.league.name}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                ) : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.textUpdate}>К сожалению, что-то пошло не так! Попытайтесь загрузить информацию еще раз! &darr;</Text>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            style={styles.updateBtn}
                            onPress={updateInfo}
                        >
                            <Text style={styles.textUpdate}>Загрузить</Text>
                        </TouchableHighlight>
                    </View>
                )}
            </Padding>
        </MainBg>
    )
};
