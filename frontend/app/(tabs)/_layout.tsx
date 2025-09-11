import React, { useState } from "react";
import Header from "@/components/HomeHeader";
import { Alert, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { BottomNavigation } from "../navigation-bar";

// Import your tab screens
import PatientDashboard from "./index";
import MedicalHistory from "./medical-history";
import LabResults from "./lab-results";
import Appointments from "./appointments";
import Profile from "./profile";
import FAQ from "./faq";

const handleSearchPress = () => {
  Alert.alert("Search", "Search functionality coming soon!");
};

const handleNotificationPress = () => {
  Alert.alert("Notifications", "Notification functionality coming soon!");
};

const tabComponents: Record<string, React.ReactNode> = {
  dashboard: <PatientDashboard />,
  history: <MedicalHistory />,
  results: <LabResults />,
  appointments: <Appointments />,
  profile: <Profile />,
  faq: <FAQ />,
};

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <View style={styles.container}>
      <View style={styles.content}>{tabComponents[activeTab]}</View>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  content: {
    flex: 1,
  },
});
