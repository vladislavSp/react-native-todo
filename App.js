import React, { useEffect } from "react";
import { getData } from './utils/storeUtils';
import { StyleSheet, View, FlatList, Text } from "react-native";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import Form from "./components/Form";
import useStateCallback from "./hooks/useStateCallback";

export default function App() {
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

    const deleteRowHandler = (item, index) => {
        console.log(index);
    };

  return (
    <View style={styles.main}>
        <Header title={"Список дел"} />

        {tasks.length === '0'
            ? <Text>Добавьте сюда свои задачи</Text> :
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
                        onDelete={() => deleteRowHandler(index)}
                    />
                )}
            />
         }

        <Form setTasks={setTasks} />
    </View>
  );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#e5e5e5",
        paddingBottom: 140,
    },
    list: {
        paddingRight: 24,
        paddingTop: 24,
        paddingBottom: 60,
    },
    slide: {
        marginBottom: 16,
    }
});
