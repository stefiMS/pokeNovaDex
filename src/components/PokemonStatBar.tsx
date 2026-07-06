import { View, Text, StyleSheet } from 'react-native';

import { PokemonStatBarProps } from '../types';

export const PokemonStatBar = ({ label, value }: PokemonStatBarProps) => {
  const progress = (value / 100) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: getStatColor(value),
            },
          ]}
        />
      </View>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const getStatColor = (value: number) => {
  if (value >= 100) return '#22C55E';
  if (value >= 70) return '#3B82F6';

  return '#84CC16';
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    height: 20,
    width: '100%',
    gap: 12,
  },
  label: {
    width: 90,
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  progressContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 999,
    height: 20,
  },
  value: {
    // width: 40,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
});
