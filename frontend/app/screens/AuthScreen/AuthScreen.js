import React, { useState } from 'react';
import request, { METHODS } from '../../utils/request';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import Input, { mailIcon, passIcon } from '../../components/Inputs/Input';
import { styles } from './AuthStyles';
import useAuth from '../../hooks/useAuth';

const Auth = ({ navigation }) => {
    const [authState, setAuthState] = useState({ email: '', pwd: '' });
    const [isLoading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const { signIn } = useAuth();

    const onChangeHandler = (evt, name) => {
        const { text } = evt.nativeEvent;
        setRegState(prev => ({ ...prev, [name]: text }));
    };

    const submitHandler = async () => {
        try {
            setLoading(true);
            signIn(authState);
        } catch (error) {
        } finally {
            setLoading(false);
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
                onChange={e => onChangeHandler(e, 'email')}
                onFocus={() => setErrorText('')}
            />

            <Input
                placeholder='ПАРОЛЬ'
                iconSource={passIcon}
                iconStyle={styles.iconPass}
                keyboardType='visible-password'
                secureTextEntry={true}
                value={password}
                onChange={e => onChangeHandler(e, 'pwd')}
            />

            <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.forgotText}>Забыли пароль?</Text>
            </TouchableOpacity>

            <TouchableHighlight onPress={submitHandler} activeOpacity={0.6}>
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
