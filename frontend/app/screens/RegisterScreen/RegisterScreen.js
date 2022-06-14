import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input, { nameIcon, mailIcon, passIcon, triangleIcon } from '../../components/Inputs/Input';
import useAuth from '../../hooks/useAuth';
import { styles } from '../AuthScreen/AuthStyles';

const checkIcon = require('../../../assets/images/icons/completeCheck.png');

const RegisterScreen = ({ navigation }) => {
    const { register } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [regState, setRegState] = useState({ name: '', email: '', pwd: '' });
    const [registerComplete, setRegisterComplete] = useState(false);
    const [error, setError] = useState({
        name: '', email: '', pwd: '', general: '',
    });

    const onChangeHandler = (evt, name) => {
        const { text } = evt.nativeEvent;
        setRegState(prev => ({ ...prev, [name]: text }));
    };

    const handleSubmit = async () => {
        const { name, email, pwd } = regState;

        if (!name.length > 0) setError(prev => ({ ...prev, name: 'Введите имя!'}));
        if (!email.length > 0) setError(prev => ({ ...prev, email: 'Заполните email!'}));
        if (!pwd.length > 6 || pwd.length === 0) setError(prev => ({ ...prev, pwd: 'Пароль должен быть больше 6 символов!'}));
        else {
            try {
                setLoading(true);
                register(regState, setRegisterComplete, setError);
            }
            catch (error) {}
            finally {
                setLoading(false);
            }
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
