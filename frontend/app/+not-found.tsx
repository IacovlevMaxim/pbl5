import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});

export default function NotFoundPage() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops! Page not found!" }} />
            <View style={styles.container}>
                <Link style={styles.button} href="/">
                    Go to Home
                </Link>
            </View>
        </>
    )
}