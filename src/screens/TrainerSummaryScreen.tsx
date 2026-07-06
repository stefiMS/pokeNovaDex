import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, POKEMON_TYPE_LABELS } from '../theme';
import { POKEMON_TYPE_EMOJIS } from '../constants';
import { Stepper } from '../components/Stepper';
import { PrimaryButton } from '../components/PrimaryButton';
import { useTrainerStore } from '../store/useTrainerStore';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<any>;

export const TrainerSummaryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const trainer = useTrainerStore((state) => state.trainer);

  const handleEdit = () => {
    navigation.goBack();
  };

  const handleComplete = () => {
    navigation.navigate('HomeTab');
  };

  const favoriteTypes = trainer.favoriteType
    ? trainer.favoriteType.split(',').filter((t) => t.trim())
    : [];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Stepper currentStep={3} totalSteps={3} />

        <View style={styles.summarySection}>
          <Text style={styles.title}>Resumen del Carnet de Entrenador</Text>

          <View style={styles.card}>
            <View style={styles.fieldRow}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{trainer.fullName}</Text>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.label}>Edad</Text>
              <Text style={styles.value}>{trainer.age} años</Text>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.label}>Correo</Text>
              <Text style={styles.value}>{trainer.email}</Text>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.label}>Distrito</Text>
              <Text style={styles.value}>{trainer.district}</Text>
            </View>

            <View style={styles.fieldRow}>
              <Text style={styles.label}>Tipos Favoritos</Text>
              <View style={styles.typesContainer}>
                {favoriteTypes.length > 0 ? (
                  favoriteTypes.map((type) => (
                    <View key={type} style={styles.typeBadge}>
                      <Text style={styles.typeEmoji}>
                        {
                          POKEMON_TYPE_EMOJIS[
                            type as keyof typeof POKEMON_TYPE_EMOJIS
                          ]
                        }
                      </Text>
                      <Text style={styles.typeLabel}>
                        {
                          POKEMON_TYPE_LABELS[
                            type as keyof typeof POKEMON_TYPE_LABELS
                          ]
                        }
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.value}>No seleccionado</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Editar"
          variant="outline"
          onPress={handleEdit}
          width="50%"
          icon={<Ionicons name="pencil" size={20} color={COLORS.interactive} />}
        />

        <PrimaryButton title="Completar" onPress={handleComplete} width="50%" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  content: {
    padding: 24,
  },

  summarySection: {
    marginTop: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray900,
    marginBottom: 24,
  },

  card: {
    backgroundColor: COLORS.backgroundType,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  fieldRow: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: COLORS.gray500,
    fontWeight: '600',
    marginBottom: 8,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray900,
  },

  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  typeEmoji: {
    fontSize: 20,
  },

  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900,
  },

  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
    width: '100%',
    justifyContent: 'space-between',
  },
});
