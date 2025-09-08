import { StyleSheet, Text, TextInput, View } from "react-native";

interface InputFieldProps {
    label: string;
    value: string;
    setValue: (text: string) => void;
    error?: string;
    secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, setValue, error, secureTextEntry = false }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>

            <TextInput
                style={[
                    styles.input,
                    error ? styles.inputError : null
                ]}
                placeholder={`Enter your ${label.toLowerCase()}`}
                placeholderTextColor="#888"
                value={value}
                onChangeText={setValue}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
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
});

export default InputField;