import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "@/components/HomeHeader";
import { Alert } from "react-native";

const handleSearchPress = () => {
  Alert.alert("Search", "Search functionality coming soon!");
};

const handleNotificationPress = () => {
  Alert.alert("Notifications", "Notification functionality coming soon!");
};

const faqData = [
  {
    question: "What is MedHub?",
    answer:
      "MedHub is a platform for managing medical information and appointments.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Click the Sign Up button on the home page and fill out the registration form.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we use industry-standard security measures to protect your data.",
  },
];

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header
        userName="Mr. Williamson"
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />
      ;<Text style={styles.header}>Frequently Asked Questions</Text>
      {faqData.map((item, index) => (
        <View key={index} style={styles.item}>
          <TouchableOpacity onPress={() => toggleAccordion(index)}>
            <Text style={styles.question}>{item.question}</Text>
          </TouchableOpacity>
          {openIndex === index && (
            <Text style={styles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 20,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 8,
  },
  question: {
    color: "#7f58ff",
    fontSize: 18,
    fontWeight: "bold",
  },
  answer: {
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
  },
});
