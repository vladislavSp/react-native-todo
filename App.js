import React, { useEffect } from "react";
import { getData } from './utils/storeUtils';
import { StyleSheet, View, FlatList, Text } from "react-native";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import Form from "./components/Form";
import useStateCallback from "./hooks/useStateCallback";

export default function App() {
    const [tasks, setTasks] = useStateCallback([]);

    useEffect(() => {
        // загрузка из LS
        const data = getData('taskList');
        data.then(data => setTasks(data !== null ? data : []));
    }, [setTasks]);

  return (
    <View style={styles.main}>
        <Header title={"Список дел"} />

        <FlatList
            contentContainerStyle={{ paddingBottom: 20 }}
            style={styles.list}
            data={tasks}
            renderItem={({ item }) => (
                <ListItem key={item.text} item={item} />
            )}
        />

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
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 60,
    }
});
