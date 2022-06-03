import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableHighlight } from 'react-native';
import { apiRoute } from '../../../api/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './HomeStyles';
import LionSvg from '../../../assets/images/icons/lion.svg';
import LaLiga from '../../../assets/images/icons/laliga.svg';

const mockData = [
    {
        name: 'Premiere League',
        gradient: {
            bg1: '#A32FFF',
            bg2: '#7000FF',
        },
        icon: LionSvg,
    }, {
        name: 'LaLiga',
        gradient: {
            bg1: '#FE0000',
            bg2: '#FE7B01',
        },
        icon: LaLiga,
    }, {
        name: 'Bundesliga',
        gradient: {
            bg1: '#FFB627',
            bg2: '#FF8413',
        },
        icon: LaLiga,
    },
];

const apiRouteLeagues = 'https://api.football-data.org/v4/competitions';

export default function Home({ navigation }) {
    const [data, setData] = useState(mockData);
    const numColumns = 2;
    const initialNumToRender = 8;

    useEffect(() => setData(mockData), []); // update

    useEffect(() => { // Запрос лиг
        const fetchData = async () => {
            try { // leagues?id=39
                const url = `${apiRoute}/leagues`;
                const data = await fetch(url, {
                    "Content-Type": "application/json",
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "v3.football.api-sports.io",
                        "x-apisports-key": "f3660b0dcfbdfce3bfc8676f3ddc4ee3"
                    }
                });
                const { response } = await data.json();
                setData(response);
            } catch (error) {
                console.warn(error);
            }
        };

        const fetchData1 = () => {
            fetch(apiRouteLeagues, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((json) => {
                // console.log('Then Data: ', json);
                // записать в БД
            }).catch(error => {
                // console.log('Catch Error: ', error);
            });
        }

        fetchData1();
    }, [apiRouteLeagues]);

    return (
        <View style={styles.wrapper}>
            {data.length === 0 ? (
                <Text>Mock Loading</Text>
            ) : (
                <FlatList
                    style={styles.container}
                    initialNumToRender={initialNumToRender}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    keyExtractor={(item => item.id)}
                    data={data}
                    pagingEnabled={true}
                    numColumns={numColumns}
                    renderItem={({ item }) => (
                        <TouchableHighlight
                            onPress={() => {
                                navigation.navigate('Details', {
                                    screen: 'Details',
                                    params: { itemName: item.name }
                                })}
                            }
                        >
                            <LinearGradient
                                key={item.id}
                                colors={[item.gradient.bg1, item.gradient.bg2]}
                                style={styles.slide}
                            >
                                <View style={styles.textWrap}>
                                    <item.icon width={30} height={30} />
                                    <Text style={styles.text}>{item.name}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableHighlight>
                    )}
                />
            )}
        </View>
    )
}