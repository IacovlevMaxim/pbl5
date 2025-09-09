import Header from "@/components/HomeHeader";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    // justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  link: {
    // marginTop: 15,
  },
  button: {
    backgroundColor: '#7f58ff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default function Index() {
  const auth = useAuth();
  
  const handleSignOut = () => {
    auth?.signOut();
  };

  const handleSearchPress = () => {
    Alert.alert("Search", "Search functionality coming soon!");
  };
  
  const handleNotificationPress = () => {
    Alert.alert("Notifications", "Notification functionality coming soon!");
  };
  
  return (
    <View style={styles.container}>
      <Header 
        userName="Mr. Williamson"
        onSearchPress={handleSearchPress}
        onNotificationPress={handleNotificationPress}
      />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.text}>Welcome to the home screen!</Text>
        <Text style={styles.text}>You are now logged in.</Text>
        
        <Link href="/about" style={styles.link}>
          <Text style={styles.text}>Go to About</Text>
        </Link>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <Link href="/login" style={styles.link}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}
