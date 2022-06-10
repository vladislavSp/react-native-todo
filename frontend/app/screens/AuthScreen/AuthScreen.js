import React from 'react';
import { ScrollView, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './AuthStyles';
import Input, { mailIcon, passIcon } from '../../components/Inputs/Input';

const Auth = ({ navigation }) => (
    <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.wrapper}
        scrollEnabled={false}
        nestedScrollEnabled={false}
    >
        <Text style={styles.headerText}>Авторизация</Text>

        <Input
            inputStyle={{ marginBottom: 15 }}
            placeholder='EMAIL'
            iconSource={mailIcon}
        />

        <Input
            placeholder='ПАРОЛЬ'
            iconSource={passIcon}
            iconStyle={styles.iconPass}
            keyboardType='visible-password'
            secureTextEntry={true}
        />

        <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.forgotText}>Забыли пароль?</Text>
        </TouchableOpacity>

        <TouchableHighlight>
            <LinearGradient colors={['#A32FFF', '#7000FF']} style={styles.button}>
                <Text style={styles.buttonText}>Войти</Text>
                <Image source={require('../../../assets/images/icons/triangle.png')} style={styles.buttonIcon} />
            </LinearGradient>
        </TouchableHighlight>

         <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.haveAccountText}>Нет аккаунта?</Text>
         </TouchableOpacity>
    </ScrollView>
);

export default Auth;
