import React, { useEffect, useCallback } from "react";
import { getData, storeData } from './utils/storeUtils';
import { StyleSheet, View, FlatList, Text, KeyboardAvoidingView } from "react-native";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import Form from "./components/Form";
import useStateCallback from "./hooks/useStateCallback";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

export default function App() {
    const [fontLoad, setFontLoad] = useStateCallback(false);
    const [tasks, setTasks] = useStateCallback([]);
    let row = [];
    let prevOpenedRow;

    useEffect(() => {
        async function download() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Font.loadAsync({
                    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                });
            } catch (e) {
                console.warn(e);
            } finally {
                setFontLoad(true);
            }
        }
        download();
    }, []);

    useEffect(() => {
        // загрузка из LS
        const data = getData('taskList');
        data.then(data => setTasks(data !== null ? data : []));
    }, [setTasks]);

    const onLayoutRootView = useCallback(async () => {
    if (fontLoad) {
        // This tells the splash screen to hide immediately! If we call this after
        // `setAppIsReady`, then we may see a blank screen while the app is
        // loading its initial state and rendering its first pixels. So instead,
        // we hide the splash screen once we know the root view has already
        // performed layout.
        await SplashScreen.hideAsync();
        }
    }, [fontLoad]);

    const closeRowHandler = (index) => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
    };

    const deleteRowHandler = (item) => {
        const taskCopied = [...tasks].filter(t => t.id !== item.id);
        setTasks(taskCopied);
        storeData(taskCopied, 'taskList');
    };

    if (!fontLoad) {
        return null;
    }

    return (
        <View style={styles.main} onLayout={onLayoutRootView}>
            <Header title={"Список дел"} />

            {tasks.length === 0
                ? (
                <KeyboardAvoidingView style={styles.emptyWrap} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                    <Text style={styles.emptyText}>У вас еще нет заметок, надо это исправлять!</Text>
                </KeyboardAvoidingView>
                ) : (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 20 }}
                        keyExtractor={(item => item.id)}
                        style={styles.list}
                        data={tasks}
                        renderItem={({ item, index }) => (
                            <ListItem
                                style={styles.slide}
                                key={item.id}
                                index={index}
                                item={item}
                                row={row}
                                closeRow={closeRowHandler}
                                onDelete={() => deleteRowHandler(item)}
                            />
                        )}
                    />
                )
            }

            <Form setTasks={setTasks} />
        </View>
  );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        paddingBottom: 140,
    },
    list: {
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 60,
    },
    slide: {
        marginBottom: 16,
    },
    emptyWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        paddingHorizontal: 32,
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'OpenSans-Bold',
    },
});
