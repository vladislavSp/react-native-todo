import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableHighlight, ImageBackground } from 'react-native';
import apiMethods from '../../../api/methods';
import { API_URL } from '../../../api/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { setGradients } from '../../utils/setGradients';
import { styles } from './HomeStyles';
import request from '../../utils/request';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import LionSvg from '../../../assets/images/icons/lion.svg';
import LaLigaIcon from '../../../assets/images/icons/laliga.svg';
import BundesIcon from '../../../assets/images/icons/bundes.svg';
import image1 from '../../../assets/images/leagues/image1.jpg';
import image2 from '../../../assets/images/leagues/image2.jpg';
import image3 from '../../../assets/images/leagues/image3.jpg';

export default function Home({ navigation }) {
    const [leagues, setLeagues] = useState([]);
    const [error, setError] = useState(''); // TODO - create error Modal!
    const numColumns = 2;
    const initialNumToRender = 8;

    useEffect(() => { // Запрос лиг
        if (!leagues.length) {
            const fetchData = async () => {
                const { data, status, error } = await request(`${API_URL}${apiMethods.leagues}`);

                if (status < 400) {
                    setLeagues(data);
                } else {
                    setError(error.message);
                }
            }

            fetchData();
        }
    }, []);

    if (!leagues?.length) return null;

    return (
        <MainBg>
            <Padding>
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
                            onPress={() => {
                                navigation.navigate(
                                    'Details', {
                                        leagueId: item.league.id,
                                        itemName: item.league.name,
                                        currentYear: item.seasons.find(el => el.current).year
                                    }
                                )}
                            }
                        >
                            <ImageBackground source={image1} resizeMode="cover"
                                style={styles.slide}
                            >
                                <LinearGradient 
                                    colors={setGradients(index)}
                                    style={styles.gradient}
                                />
                                <View style={styles.textWrap}>
                                    {/* <item.icon width={30} height={30} /> */}
                                    <Text style={styles.text}>{item.league.name}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableHighlight>
                    )}
                />
            </Padding>
        </MainBg>
    )
}