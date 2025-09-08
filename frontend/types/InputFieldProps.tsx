interface InputFieldProps {
    label: string;
    value: string;
    required?: boolean;
    setValue: (text: string) => void;
    error?: string | undefined;
    secureTextEntry?: boolean;
    validationFn?: (value: string) => string | undefined;
}

export default InputFieldProps;