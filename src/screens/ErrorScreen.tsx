import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';
import { Ionicons } from '@expo/vector-icons';

type ErrorScreenProps = {
  onRetry: () => void;
  error?: string | { message: string };
};
export const ErrorScreen = ({ onRetry, error }: ErrorScreenProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="alert-circle-outline"
        size={48}
        color={COLORS.interactive}
      />
      <Text style={styles.title}>¡Ups! No pudimos cargar los Pokémon</Text>
      {error && (
        <Text style={styles.description}>
          {typeof error === 'string'
            ? error
            : error?.message || 'Intenta de nuevo más tarde'}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.surface,
    flexDirection: 'column',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#212121',
    marginBottom: 12,
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#757575',
    lineHeight: 22,
    marginBottom: 32,
  },

  button: {
    backgroundColor: `${COLORS.interactive}`,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: COLORS.surface,
    fontWeight: '600',
    fontSize: 16,
  },
});
