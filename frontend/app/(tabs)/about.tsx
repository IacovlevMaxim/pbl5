import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/HomeHeader";
import { Alert } from "react-native";
import { Colors } from "@/constants/Colors";
const handleSearchPress = () => {
  Alert.alert("Search", "Search functionality coming soon!");
};

const handleNotificationPress = () => {
  Alert.alert("Notifications", "Notification functionality coming soon!");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  text: {
    color: Colors.light.text,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Header
        userName="Mr. Williamson"
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />
    </View>
  );
}
