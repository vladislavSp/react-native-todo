import React from 'react';
import { Text, View, Button } from 'react-native';
import { styles } from './styles';
import MainBg from '../MainBg/MainBg';
import Padding from '../Padding/Padding';

// Страница для динамических данных
const Details = ({ route, navigation }) => {
    const { itemName } = route.params;

    return (
        <MainBg>
            <Padding>
                <View style={{ paddingTop: 20 }}>
                    <Text style={styles.title}>Этот id нужен для загрузки данных о: {itemName}</Text>
                    <Text style={styles.text}>Далее здесь нужно будет разместить таблицу с играми за прошедший сезон</Text>
                    <Button title="Назад на страницу" onPress={() => navigation.navigate('HomeStack')} />
                </View>
            </Padding>
        </MainBg>
    )
};

export default Details;
