import React, { useState } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './AuthStyles';
import Input, { mailIcon, passIcon } from '../../components/Inputs/Input';
import request, { METHODS } from '../../utils/request';

const Auth = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    const onTextHandler = text => {
        setEmail(text);
    };

    const setPasswordHandler = pass => {
        setPassword(pass);
    };

    const submitHandler = async () => {
        const body = { email, password };
        const { data, status, error } = await request('http://192.168.0.167:3500/auth', {
            method: METHODS.POST,
            body: JSON.stringify(body),
        });

        if (status && status < 400) {
            // console.log(data, status, error);
        } else {
            console.log(data, status, error);
            setErrorText(error.message);
        }
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.wrapper}
            scrollEnabled={false}
            nestedScrollEnabled={false}
        >
            <Text style={styles.headerText}>Авторизация</Text>

            {errorText?.length > 0 && <Text style={styles.errorText}>{errorText}</Text>}

            <Input
                inputStyle={{ marginBottom: 15 }}
                placeholder='EMAIL'
                keyboardType='email-address'
                iconSource={mailIcon}
                value={email}
                onChangeText={onTextHandler}
                onFocus={() => setErrorText('')}
            />

            <Input
                placeholder='ПАРОЛЬ'
                iconSource={passIcon}
                iconStyle={styles.iconPass}
                keyboardType='visible-password'
                secureTextEntry={true}
                value={password}
                onChangeText={setPasswordHandler}
            />

            <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.forgotText}>Забыли пароль?</Text>
            </TouchableOpacity>

            <TouchableHighlight onPress={submitHandler}>
                <LinearGradient colors={['#A32FFF', '#7000FF']} style={styles.button}>
                    <Text style={styles.buttonText}>Войти</Text>
                    <Image source={require('../../../assets/images/icons/triangle.png')} style={styles.buttonIcon} />
                </LinearGradient>
            </TouchableHighlight>

            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.haveAccountText}>Нет аккаунта?</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

export default Auth;
