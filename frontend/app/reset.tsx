import InputField from "@/components/InputField";
import { useAuth } from "@/hooks/useAuth";
import useInputField from "@/hooks/useInputField";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
const emailValidation = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Enter a valid email address.";
  return undefined;
};

export default function Reset() {
  const router = useRouter();
  const [sentLink, setSentLink] = useState(false);
  const auth = useAuth();
  const emailField = useInputField({
    label: "Email",
    value: "",
    validationFn: emailValidation,
  });

  const validateForm = () => {
    const fields = [emailField];
    for (const field of fields) {
      if (field.validationFn) {
        const error = field.validationFn(field.value);
        if (error) return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // In a real app, you would authenticate with a server here

      //   const res = await auth?.authFetch('/reset', {
      //     fetchParams: {
      //       method: 'POST',
      //       body: JSON.stringify({
      //         email: emailField.value
      //       })
      //     }
      //   }).then(r => r.json());

      setSentLink(true);

      router.push("/new-password");

      //   auth?.signIn();
      // Navigation is handled by the AuthProvider in _layout.tsx
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View
          style={{
            marginBottom: 40,
            marginLeft: 10,
            marginRight: 10,
            alignContent: "center",
          }}
        >
          <Text style={styles.text}>
            You will receive the link to reset your password at the email
            address provided.
          </Text>
        </View>

        <InputField {...emailField} />

        {sentLink && (
          <Text style={[styles.text, { color: "#4BB543" }]}>
            Reset link sent! Please check your email.
          </Text>
        )}

        <TouchableOpacity
          style={sentLink ? styles.buttonDisabled : styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={sentLink}
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 15,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    marginTop: 5,
    fontSize: 14,
  },
  text: {
    color: "#fff",
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "#7f58ff",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: Colors.light.text,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "gray",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
