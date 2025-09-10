import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
export default function ActivateScreen() {
  const handleGoToMainPage = () => {
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkmarkContainer}>
        <Text style={styles.checkmark}>✓</Text>
      </View>

      <Text style={styles.title}>Account Activated</Text>

      <Text style={styles.subtitle}>You can now go to main page</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGoToMainPage}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Go to Main Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  checkmarkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  checkmark: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.light.button.primary,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    minWidth: 200,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
