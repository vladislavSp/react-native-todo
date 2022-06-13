import React, { useState, useContext } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input, { nameIcon, mailIcon, passIcon, triangleIcon } from '../../components/Inputs/Input';
import { styles } from '../AuthScreen/AuthStyles';
import request, { METHODS } from '../../utils/request';
import AppContext from '../../Context/AppContext';
import * as SecureStore from 'expo-secure-store';
import { storeData } from '../../utils/storeUtils';

const checkIcon = require('../../../assets/images/icons/completeCheck.png');

const RegisterScreen = ({ navigation }) => {
    const [registerComplete, setRegisterComplete] = useState(false);
    const [regState, setRegState] = useState({ name: '', email: '', pwd: '' });
    const [error, setError] = useState({
        name: '', email: '', pwd: '', general: '',
    });
    const [isLoading, setLoading] = useState(false);
    const [_, setAuth] = useContext(AppContext);

    const onChangeHandler = (evt, name) => {
        const { text } = evt.nativeEvent;
        setRegState(prev => ({ ...prev, [name]: text }));
    }

    const handleSubmit = async () => {
        const { name, email, pwd } = regState;

        if (!name.length > 0) setError(prev => ({ ...prev, name: 'Введите имя!'}));
        if (!email.length > 0) setError(prev => ({ ...prev, email: 'Заполните email!'}));
        if (!pwd.length > 6 || pwd.length === 0) setError(prev => ({ ...prev, pwd: 'Пароль должен быть больше 6 символов!'}));
        else {
            setLoading(true);
            const body = { user: regState.name, email: regState.email, password: regState.pwd };
            const response = await request('http://192.168.0.167:3500/register', {
                method: METHODS.POST,
                body: JSON.stringify(body),
            });

            const { data, status, error } = response;

            if (status < 400) {
                // показывать успешной рег-ции, next step - change auth on true
                // + получить объект юзера - вернуть его из бэка и сохранить токен на клиенте
                await SecureStore.setItemAsync('accessToken', data.accessToken);
                storeData(data.user, 'user');

                setRegisterComplete(true);
                setTimeout(() => {
                    setAuth(true);
                }, 1500);
            }

            if (status >= 400) {
                setError(prev => ({
                    ...prev,
                    general: error.message,
                }));
            }

            setLoading(false);
        }
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.wrapper}
            scrollEnabled={false}
            nestedScrollEnabled={false}
        >
            {!registerComplete ? (
            <>
                <Text style={styles.headerText}>Регистрация</Text>

                {error.general.length > 0 && <Text style={styles.errorText}>{error.general}</Text>}

                <Input
                    error={error.name}
                    inputStyle={{ marginBottom: 15 }}
                    placeholder='ИМЯ'
                    iconSource={nameIcon}
                    iconStyle={styles.iconName}
                    value={regState.name}
                    onChange={e => onChangeHandler(e, 'name')}
                    onFocus={() => setError(prev => ({ ...prev, name: '', general: ''}))}
                    autoCapitalize='none'
                />

                <Input
                    error={error.email}
                    inputStyle={{ marginBottom: 15 }}
                    placeholder='EMAIL'
                    iconSource={mailIcon}
                    keyboardType='email-address'
                    value={regState.email}
                    onChange={(e) => onChangeHandler(e, 'email')}
                    onFocus={() => setError(prev => ({ ...prev, email: '', general: ''}))}
                />

                <Input
                    error={error.pwd}
                    name={'password'}
                    placeholder='ПАРОЛЬ'
                    iconSource={passIcon}
                    iconStyle={styles.iconPass}
                    keyboardType='visible-password'
                    secureTextEntry={true}
                    value={regState.pwd}
                    onChange={e => onChangeHandler(e, 'pwd')}
                    onFocus={() => setError(prev => ({ ...prev, pwd: '', general: ''}))}
                />

                <TouchableHighlight onPress={handleSubmit} activeOpacity={0.6}>
                    <LinearGradient colors={['#A32FFF', '#7000FF']} style={styles.button}>
                        {isLoading ? <ActivityIndicator size="small" />
                        : <Text style={styles.buttonText}>Регистрация</Text>
                        }
                        <Image source={triangleIcon} style={styles.buttonIcon} />
                    </LinearGradient>
                </TouchableHighlight>

                <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
                    <Text style={styles.haveAccountText}>Есть аккаунт?</Text>
                </TouchableOpacity>
            </>
            ) : (
                <View style={styles.completeWrapper}>
                    <LinearGradient colors={['#A32FFF', '#7000FF']} style={styles.completeIcon}>
                        <Image source={checkIcon} />
                    </LinearGradient>
                    <Text style={styles.headerText}>Регистрация успешна</Text>
                </View>
            )}
        </ScrollView>
    )
};

export default RegisterScreen;
