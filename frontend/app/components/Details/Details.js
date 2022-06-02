import React from 'react';
import { Text, View, Button } from 'react-native';

const Details = ({ route, navigation }) => {
    const { itemName } = route.params;
    console.log(itemName);

    return (
        // TODO сделать обертку для отступов единых во всем приложении
        <View style={{ paddingTop: 20 }}>
            <Text>{itemName}</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('HomeStack')} />
        </View>
    )
};

export default Details;
