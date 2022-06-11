import React, { useState } from 'react';
import { Image, Text, ScrollView, TouchableOpacity, TouchableHighlight} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Input, { nameIcon, mailIcon, passIcon, triangleIcon } from '../../components/Inputs/Input';
import { styles } from '../AuthScreen/AuthStyles';
import request, { METHODS } from '../../utils/request';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errorText, setErrorText] = useState('');

    const onChangeNameHandler = (name) => {
        setName(name);
    };
    const onChangeMailHandler = (mail) => {
        setEmail(mail);
    };
    const onChangePwdHandler = (password) => {
        setPwd(password);
    };

    const handleSubmit = async () => {
        const body = { user: name, email, password: pwd };
        const response = await request('http://192.168.0.167:3500/register', {
            method: METHODS.POST,
            body: JSON.stringify(body),
        });

        console.log(response);
        if (response.status < 400) {
            // показывает успешную регистрацию, а потом делаем редирект на главную
        }

        if (response.status > 400) {
            setErrorText(response.error.message);
        }
    };


    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.wrapper}
            scrollEnabled={false}
            nestedScrollEnabled={false}
        >
            <Text style={styles.headerText}>Регистрация</Text>

            {errorText?.length > 0 && <Text style={styles.errorText}>{errorText}</Text>}

            <Input
                inputStyle={{ marginBottom: 15 }}
                placeholder='ИМЯ'
                iconSource={nameIcon}
                iconStyle={styles.iconName}
                value={name}
                onChangeText={onChangeNameHandler}
                onFocus={() => setErrorText('')}
            />

            <Input
                inputStyle={{ marginBottom: 15 }}
                placeholder='EMAIL'
                iconSource={mailIcon}
                keyboardType='email-address'
                value={email}
                onChangeText={onChangeMailHandler}
            />

            <Input
                placeholder='ПАРОЛЬ'
                iconSource={passIcon}
                iconStyle={styles.iconPass}
                keyboardType='visible-password'
                secureTextEntry={true}
                value={pwd}
                onChangeText={onChangePwdHandler}
            />

            <TouchableHighlight onPress={handleSubmit} activeOpacity={0.6}>
                <LinearGradient colors={['#A32FFF', '#7000FF']} style={styles.button}>
                    <Text style={styles.buttonText}>Регистрация</Text>
                    <Image source={triangleIcon} style={styles.buttonIcon} />
                </LinearGradient>
            </TouchableHighlight>

            <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
                <Text style={styles.haveAccountText}>Есть аккаунт?</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

export default RegisterScreen;
