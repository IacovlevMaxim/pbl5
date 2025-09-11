import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { FontAwesome } from "@expo/vector-icons";
interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", label: "Home", icon: "home" },
  { id: "appointments", label: "Appointments", icon: "calendar" },
  { id: "results", label: "Results", icon: "activity" },
  { id: "history", label: "History", icon: "file-text" },
  { id: "profile", label: "Profile", icon: "user" },
];

export function BottomNavigation({
  activeTab,
  onTabChange,
}: BottomNavigationProps) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.navRow}>
        {tabs.map(({ id, label, icon }) => (
          <TouchableOpacity
            key={id}
            onPress={() => onTabChange(id)}
            style={[
              styles.tabButton,
              activeTab === id ? styles.tabActive : styles.tabInactive,
            ]}
          >
            <Feather
              name={icon}
              size={22}
              color={activeTab === id ? "#4F8EF7" : "#888"}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === id
                  ? styles.tabLabelActive
                  : styles.tabLabelInactive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    //sition: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-evenly", // or "space-between"
    alignItems: "center",
    paddingVertical: 8,
    width: "100%", // <-- ensures full width
    // alignSelf: "stretch", // <-- not needed
    // maxWidth: 500, // <-- remove this
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  tabActive: {
    backgroundColor: "#dbeafe",
  },
  tabInactive: {
    backgroundColor: "#fff",
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#4F8EF7",
  },
  tabLabelInactive: {
    color: "#888",
  },
});
