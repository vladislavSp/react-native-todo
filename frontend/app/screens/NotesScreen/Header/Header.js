import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: "#536aa5",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});
