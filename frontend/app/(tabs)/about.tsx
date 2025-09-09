import { StyleSheet, Text, View } from "react-native";
import React from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
})

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>About screen</Text>
        </View>
    );
}