import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableHighlight, ImageBackground } from 'react-native';
import apiMethods from '../../../api/methods';
import { API_ADDRESS } from '../../../api/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './HomeStyles';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';
import LionSvg from '../../../assets/images/icons/lion.svg';
import LaLigaIcon from '../../../assets/images/icons/laliga.svg';
import BundesIcon from '../../../assets/images/icons/bundes.svg';
import image1 from '../../../assets/images/leagues/image1.jpg';
import image2 from '../../../assets/images/leagues/image2.jpg';
import image3 from '../../../assets/images/leagues/image3.jpg';

const mockData = [
    {
        name: 'Premiere League',
        icon: LionSvg,
        image: image1,
    }, {
        name: 'LaLiga',
        icon: LaLigaIcon,
        image: image2,
    }, {
        name: 'Bundesliga',
        icon: BundesIcon,
        image: image3,
    },
];

const gradientsMain = [
    {
        bg1: '#A32FFF',
        bg2: '#7000FF',
    }, {
        bg1: '#FE0000',
        bg2: '#FE7B01',
    }, {
        bg1: '#FFB627',
        bg2: '#FF8413',
    }
];

const setGradients = (index = 0, gradients = gradientsMain) => {
    console.log(index);

    let i = index;
    const gradientLength = gradients.length;
    const n = Math.floor(index / gradientLength);

    if (index >= gradientLength) {
        i = index - (gradientLength * n);
        return gradients[i];
    }

    return [gradients[i].bg1, gradients[i].bg2];
};


export default function Home({ navigation }) {
    const [leagues, setLeagues] = useState([]);
    const numColumns = 2;
    const initialNumToRender = 8;

    useEffect(() => { // Запрос лиг
        if (!leagues.length) {
            const fetchData = () => {
                fetch(`${API_ADDRESS}${apiMethods.leagues}`, {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                .then((response) => response.json())
                .then((json) => {
                    setLeagues(json);
                    console.log('Then Data: ', json);
                }).catch(error => {
                    console.log('Catch Error: ', error);
                });
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
                    contentContainerStyle={{ paddingBottom: 20 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    keyExtractor={(item => item.league.id)}
                    data={leagues}
                    numColumns={numColumns}
                    renderItem={({ item, index }) => (
                        <TouchableHighlight
                            key={item.league.id}
                            onPress={() => {
                                navigation.navigate(
                                    'Details', { itemName: item.league.name }
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