import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainBg from '../../components/MainBg/MainBg';
import Padding from '../../components/Padding/Padding';
import { STRINGS } from '../../constants/constants';
import { getData } from '../../utils/storeUtils';
import { styles } from './SettingsStyles';
import { gradientsMain } from '../../utils/setGradients';

const SettingsScreen = () => {
    const [user, setUser] = useState({});
    const [sex, setSex] = useState('');
    const [bg, setBg] = useState(gradientsMain[1]);
    const [changeName, setChangeName] = useState(false);

    useEffect(() => {
        const setUserData = async () => {
            const user = await getData(STRINGS.userData);
            setUser(user);
        }

        setUserData();
    }, []);

    useEffect(() => {
        if (sex === 'M') setBg(gradientsMain[5]);
        else if (sex === 'W') setBg(gradientsMain[3]);
        else {
            setBg(gradientsMain[2]);
        }
    }, [sex]);

    const handleChangeName = (text) => setUser(prev => ({ ...prev, name: text}));

    if (!user?.name) return <ActivityIndicator />;

    // TODO Добавить в дизайн емеил
    return (
        <MainBg>
            <Padding>
                {/* ДОБАВИТЬ скрин по которому можно тапать */}
                <View style={styles.wrapper}>
                    <View style={styles.avatar}>
                        <LinearGradient style={styles.gradient} colors={[bg.bg1, bg.bg2]} />
                        <Text style={[styles.text, styles.avatarText]}>{user?.name?.slice(0, 1) || 'ВЫ'}</Text>
                    </View>

                    <View style={styles.nameWrap}>
                        <TextInput
                            textAlign='center'
                            textAlignVertical='center'
                            editable={changeName}
                            onChangeText={handleChangeName}
                            value={user?.name}
                            style={[styles.text,styles.name]}
                            placeholder={user?.name}
                            placeholderTextColor="rgb(255, 255, 255)"
                            onBlur={() => setChangeName(!changeName)}
                        />
                        <TouchableHighlight
                            activeOpacity={0.6}
                            onPress={() => setChangeName(!changeName)}
                        >
                            <Text style={styles.changeNameBtn}>
                                {changeName ? 'сохр.' : 'изм.'}
                            </Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.sexSection}>
                        <View style={styles.sexWrap}>
                            <Image style={styles.sexImg} source={require('../../../assets/images/icons/sex.png')} />
                            <Text style={[styles.text, styles.sexText]}>Пол</Text>
                        </View>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            style={[styles.sexBtn, styles.sexBtnFirst]}
                        >
                            <Text style={[styles.text, styles.sexText]}>Мужской</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            activeOpacity={0.6}
                            style={styles.sexBtn}
                        >
                            <Text style={[styles.text, styles.sexText]}>Женский</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.navSection}>
                        <TouchableHighlight
                            // onPress={() => navigation.navigate('Favorites')}
                        >
                            <View style={[styles.linkView, styles.linkViewFirst]}>
                                <LinearGradient 
                                    colors={[gradientsMain[0].bg1, gradientsMain[0].bg2]}
                                    style={styles.gradient}
                                />
                                <View style={styles.linkInside}>
                                    <Image style={styles.imgLink} source={require('../../../assets/images/icons/like.png')} />
                                    <Text style={[styles.text, styles.linkText]}>Избранное</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            // onPress={() => navigation.navigate('Favorites')}
                        >
                            <View style={styles.linkView}>
                                <LinearGradient 
                                    colors={[gradientsMain[0].bg1, gradientsMain[0].bg2]}
                                    style={styles.gradient}
                                />
                                <View style={styles.linkInside}>
                                    <Image style={styles.imgLink} source={require('../../../assets/images/icons/settings-without-profile.png')} />
                                    <Text style={[styles.text, styles.linkText]}>Настройки</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight activeOpacity={0.6} style={styles.logoutBtn}>
                        <Text style={[styles.text, styles.logoutBtnText]}>Выйти</Text>
                    </TouchableHighlight>
                </View>
            </Padding>
        </MainBg>
    );
}

export default SettingsScreen;
