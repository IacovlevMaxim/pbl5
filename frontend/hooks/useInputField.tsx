import InputFieldProps from "@/types/InputFieldProps";
import { useState } from "react";

interface UseInputFieldProps extends Omit<InputFieldProps, 'setValue' | 'error'> {}

const defaultValidationFn = (value: string) => {
  if (!value.trim()) return "This field is required.";
  return undefined;
};

export default function useInputField(props: UseInputFieldProps): InputFieldProps {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState<string | undefined>(undefined);

  const validationFn = (value: string) => {
    const errorMessage = props.validationFn ? props.validationFn(value) : defaultValidationFn(value);
    setError(errorMessage);
    return errorMessage;
  };

  return {
    ...props,
    value,
    setValue,
    error,
    validationFn,
  };
}
