import React from 'react';
import { View, TextInput, Image } from 'react-native';
import { styles } from './InputStyles';

export const mailIcon = require('../../../assets/images/icons/mail.png');
export const passIcon = require('../../../assets/images/icons/password.png');
export const nameIcon = require('../../../assets/images/icons/name.png');
export const triangleIcon = require('../../../assets/images/icons/triangle.png');

const Input = ({
    error,
    inputStyle,
    placeholder = 'Введите текст',
    iconSource = {},
    iconStyle = {},
    secureTextEntry = false,
    ...rest
}) => (
    <View style={[styles.input, inputStyle, error && styles.inputError]}>
        <Image
            source={iconSource}
            style={[styles.icon, iconStyle]}
        />
        <TextInput
            {...rest}
            secureTextEntry={secureTextEntry}
            style={styles.inputField}
            placeholder={placeholder}
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
        />
    </View>
);

export default Input;
