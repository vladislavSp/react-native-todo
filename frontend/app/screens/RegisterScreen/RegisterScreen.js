import React from 'react';
import { Image, Text, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input, { nameIcon, mailIcon, passIcon, triangleIcon } from '../../components/Inputs/Input';
import { styles } from '../AuthScreen/AuthStyles';

const RegisterScreen = ({ navigation }) => (
    <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.wrapper}
        scrollEnabled={false}
        nestedScrollEnabled={false}
    >
        <Text style={styles.headerText}>Регистрация</Text>

        <Input
            inputStyle={{ marginBottom: 15 }}
            placeholder='ИМЯ'
            iconSource={nameIcon}
            iconStyle={styles.iconName}
        />

        <Input
            inputStyle={{ marginBottom: 15 }}
            placeholder='EMAIL'
            iconSource={mailIcon}
        />

        <Input
            placeholder='ПАРОЛЬ'
            iconSource={passIcon}
            iconStyle={styles.iconPass}
        />

        <TouchableHighlight>
            <LinearGradient colors={['#A32FFF', '#7000FF']} style={styles.button}>
                <Text style={styles.buttonText}>Регистрация</Text>
                <Image source={triangleIcon} style={styles.buttonIcon} />
            </LinearGradient>
        </TouchableHighlight>

        <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
            <Text style={styles.haveAccountText}>Есть аккаунт?</Text>
        </TouchableOpacity>
    </ScrollView>
);

export default RegisterScreen;
