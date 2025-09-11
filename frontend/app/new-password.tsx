import InputField from "@/components/InputField";
import { useResetPasswordMutation } from "@/hooks/authMutationHooks";
import useInputField from "@/hooks/useInputField";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
const passwordValidation = (value: string) => {
  if (value.length < 6) return "Password must be at least 6 characters.";
  return undefined;
};

export default function Reset() {
  const resetPasswordMutation = useResetPasswordMutation();

  const passwordField = useInputField({
    label: "Password",
    field: "password",
    value: "",
    secureTextEntry: true,
    validationFn: passwordValidation,
  });

  const confirmPasswordField = useInputField({
    label: "Confirm Password",
    field: "confirmPassword",
    value: "",
    secureTextEntry: true,
    validationFn: passwordValidation,
  });

  const validateForm = () => {
    const fields = [passwordField, confirmPasswordField];
    for (const field of fields) {
      if (field.validationFn) {
        const error = field.validationFn(field.value);
        if (error) return false;
      }
    }

    if (passwordField.value !== confirmPasswordField.value) {
      Alert.alert("Error", "Password should be identical.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      resetPasswordMutation.mutate({
        token: "", // Should get token from activate link
        password: passwordField.value
      }, {
        onSuccess: () => {
          router.push('/activate');
        }
      });
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
          <Text style={styles.text}>Select a new password</Text>
        </View>

        <InputField {...passwordField} />

        <InputField {...confirmPasswordField} />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={resetPasswordMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
          </Text>
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
    borderColor: Colors.light.button.secondary,
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
