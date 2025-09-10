import InputField from "@/components/InputField";
import { useAuth } from "@/hooks/useAuth";
import useInputField from "@/hooks/useInputField";
import RNDateTimePicker from "@react-native-community/datetimepicker";
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
interface RegisterBody {
  [key: string]: string;
  date_of_birth: string;
}

const emailValidation = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Enter a valid email address.";
  return undefined;
};

const idnpValidation = (value: string) => {
  const idnpRegex = /^\d{13}$/; // Example: IDNP must be exactly 13 digits
  if (!idnpRegex.test(value)) return "IDNP must be exactly 13 digits.";
  return undefined;
};

const passwordValidation = (value: string) => {
  if (value.length < 6) return "Password must be at least 6 characters.";
  return undefined;
};

export default function Register() {
  const auth = useAuth();
  const [date, setDate] = useState(new Date());
  const nameField = useInputField({
    label: "Name",
    value: "",
  });
  const emailField = useInputField({
    label: "Email",
    value: "",
    validationFn: emailValidation,
  });
  const idnpField = useInputField({
    label: "IDNP",
    value: "",
    validationFn: idnpValidation,
  });
  const passwordField = useInputField({
    label: "Password",
    value: "",
    secureTextEntry: true,
    validationFn: passwordValidation,
  });
  const streetField = useInputField({
    label: "Street",
    value: "",
  });

  const fields = [nameField, idnpField, emailField, passwordField, streetField];

  const validateForm = () => {
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

      // body should be a JSON object with all the fields
      const body: RegisterBody = fields.reduce(
        (acc, field) => {
          const key = field.label.toLowerCase().replace(/ /g, "_");
          acc[key] = field.value;
          return acc;
        },
        { date_of_birth: date.toISOString().split("T")[0] } as RegisterBody
      );

      // const res = await auth?.authFetch('/register', {
      //   fetchParams: {
      //     method: 'POST',
      //     body: JSON.stringify(body)
      //   }
      // }).then(r => r.json());

      auth?.signIn();
      // Navigation is handled by the AuthProvider in _layout.tsx
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {fields.map((field, index) => (
          <InputField key={index} {...field} />
        ))}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date of Birth</Text>

          {Platform.OS === "web" ? (
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setDate(newDate);
              }}
              style={styles.input as React.CSSProperties}
            />
          ) : (
            <RNDateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
              }}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Register</Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: Colors.light.text,
    borderRadius: 8,
    padding: 15,
    color: "#888",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "white",
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  errorText: {
    color: "#ff4d4d",
    marginTop: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.light.text,
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
