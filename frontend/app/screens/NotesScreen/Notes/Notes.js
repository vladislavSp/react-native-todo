import React, { useEffect } from 'react';
import { View, FlatList, Text, KeyboardAvoidingView } from 'react-native';
import { getData, storeData } from '../../../utils/storeUtils';
import Header from '../Header/Header';
import ListItem from '../ListItem/ListItem';
import Form from '../Form/Form';
import useStateCallback from '../../../hooks/useStateCallback';
import { styles } from './NotesStyles';

export default function Notes({ navigate }) {
    const [tasks, setTasks] = useStateCallback([]);
    let row = [];
    let prevOpenedRow;

    useEffect(() => {
        // загрузка из LS
        const data = getData('taskList');
        data.then(data => setTasks(data !== null ? data : []));
    }, [setTasks]);

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

    return (
        <View style={styles.main}>
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