import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import Header from "./components/Header";
import ListItem from "./components/ListItem";
import Form from "./components/Form";

export default function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // загрузка по сети
    }, []);

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
