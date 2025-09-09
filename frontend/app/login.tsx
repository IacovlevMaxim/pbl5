import InputField from '@/components/InputField';
import { useAuth } from '@/hooks/useAuth';
import useInputField from '@/hooks/useInputField';
import { Link } from 'expo-router';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from "react";

const emailValidation = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Enter a valid email address.";
  return undefined;
}

const passwordValidation = (value: string) => {
  if (value.length < 6) return "Password must be at least 6 characters.";
  return undefined;
}

export default function Login() {
  const auth = useAuth();
  const emailField = useInputField({
    label: "Email",
    value: "",
    validationFn: emailValidation,
  })
  const passwordField = useInputField({
    label: "Password",
    value: "",
    secureTextEntry: true,
    validationFn: passwordValidation,
  })

  const validateForm = () => {
    const fields = [emailField, passwordField];
    for(const field of fields) {
      if (field.validationFn) {
        const error = field.validationFn(field.value);
        if (error) return false;
      }
    }

    return true;
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      // In a real app, you would authenticate with a server here

      // const res = await auth?.authFetch('/login', {
      //   fetchParams: { 
      //     method: 'POST',
      //     body: JSON.stringify({ 
      //       email: emailField.value, password: passwordField.value 
      //     }) 
      //   } 
      // }).then(r => r.json());

      auth?.signIn();
      // Navigation is handled by the AuthProvider in _layout.tsx
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <InputField 
          {...emailField}
        />

        <InputField 
          {...passwordField}
        />

        <Link href="/register" style={styles.link}>
          <Text>Register</Text>
        </Link>

        <Link href="/reset" style={styles.link}>
          <Text>Forgot Password</Text>
        </Link>
                

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  inputError: {
    borderColor: '#ff4d4d',
  },
  errorText: {
    color: '#ff4d4d',
    marginTop: 5,
    fontSize: 14,
  },
  link: {
    color: '#7f58ff',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#7f58ff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
