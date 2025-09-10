import { Tabs } from "expo-router";
import React from "react";
import Header from "@/components/HomeHeader";
import { Alert } from "react-native";

const handleSearchPress = () => {
  Alert.alert("Search", "Search functionality coming soon!");
};

const handleNotificationPress = () => {
  Alert.alert("Notifications", "Notification functionality coming soon!");
};

export default function TabLayout() {
  return (
    <Tabs>
      <Header
        userName="Mr. Williamson"
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, tabBarLabel: "Home" }}
      />
      <Tabs.Screen 
        name="medical-history"
        options={{ headerShown: false, tabBarLabel: "History" }}
      />
      <Tabs.Screen
        name="lab-results"
        options={{ headerShown: false, tabBarLabel: "Lab Results" }}
      />
      <Tabs.Screen  
        name="profile"
        options={{ headerShown: false, tabBarLabel: "Profile" }}
      />
      <Tabs.Screen
        name="faq"
        options={{ headerShown: false, tabBarLabel: "FAQ" }}
      />
    </Tabs>
  );
}
