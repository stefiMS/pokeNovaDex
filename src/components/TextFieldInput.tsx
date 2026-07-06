import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { COLORS } from '../theme';

type Props = TextInputProps & {
  label: string;
  required?: boolean;
  error?: string;
};

export const TextFieldInput = ({ label, required, error, ...props }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}

        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <TextInput
        {...props}
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#9CA3AF"
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#111827',
  },

  required: {
    color: COLORS.error,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    fontSize: 16,
  },

  inputError: {
    borderColor: COLORS.error,
  },

  errorText: {
    marginTop: 6,
    color: COLORS.error,
    fontSize: 14,
  },
});
