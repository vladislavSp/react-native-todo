import React from 'react';
import { ScrollView, Text, View, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './AuthStyles';

const Auth = () => (
    <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.wrapper}
        scrollEnabled={false}
        nestedScrollEnabled={false}
    >

        <Text style={styles.headerText}>Авторизация</Text>
        <View style={[styles.input, { marginBottom: 15 }]}>
            <Image
                source={require('../../../assets/images/icons/mail.png')}
                style={styles.icon}
            />
            <TextInput
                style={styles.inputField}
                placeholder='EMAIL'
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
            />
        </View>
        <View style={styles.input}>
            <Image
                source={require('../../../assets/images/icons/password.png')}
                style={[styles.icon, styles.iconPass]}
            />
            <TextInput
                style={styles.inputField}
                placeholder='ПАРОЛЬ'
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                keyboardType='visible-password'
            />
        </View>
        <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.forgotText}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableHighlight>
            <LinearGradient colors={['#A32FFF', '#7000FF']} style={styles.button}>
                <Text style={styles.buttonText}>Войти</Text>
                <Image source={require('../../../assets/images/icons/triangle.png')} style={styles.buttonIcon} />
            </LinearGradient>
        </TouchableHighlight>
        <Text style={styles.haveAccountText}>Нет аккаунта?</Text>
    </ScrollView>
);

export default Auth;
