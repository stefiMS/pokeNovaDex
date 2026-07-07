import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { COLORS, PokemonType, POKEMON_TYPE_LABELS } from '../theme';
import { DISTRICT_LIST, POKEMON_TYPE_EMOJIS } from '../constants';

import { Stepper } from '../components/Stepper';
import { PrimaryButton } from '../components/PrimaryButton';
import { useTrainerStore } from '../store/useTrainerStore';
import { Step2ScreenNavigationProp } from '../types/forms';

import * as yup from 'yup';
import { step2Schema } from '../utils';

type FormData = yup.InferType<typeof step2Schema>;

const ALL_POKEMON_TYPES: PokemonType[] = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export const Step2Screen = () => {
  const navigation = useNavigation<Step2ScreenNavigationProp>();
  const setTrainer = useTrainerStore((state) => state.setTrainer);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: yupResolver(step2Schema),
    mode: 'onChange',
    defaultValues: {
      district: '',
      favoriteTypes: [],
    },
  });

  const selectedDistrict = watch('district');
  const selectedTypes = watch('favoriteTypes') || [];

  const onSubmit = (data: FormData) => {
    setTrainer({
      district: data.district,
      favoriteType: data.favoriteTypes?.join(',') || '',
    });

    navigation.navigate('TrainerSummary');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleTypeToggle = (type: PokemonType) => {
    const currentTypes = selectedTypes;
    const isSelected = currentTypes.includes(type);

    if (isSelected) {
      setValue(
        'favoriteTypes',
        currentTypes.filter((t) => t !== type),
        { shouldValidate: true },
      );
    } else {
      if (currentTypes.length < 2) {
        setValue('favoriteTypes', [...currentTypes, type], {
          shouldValidate: true,
        });
      }
    }
  };

  const districtLabel =
    DISTRICT_LIST.find((d) => d.value === selectedDistrict)?.label ||
    'Selecciona un distrito';

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isDistrictOpen}
      >
        <Stepper currentStep={2} totalSteps={3} />

        <Text style={styles.label}>Distrito de origen *</Text>

        <Controller
          control={control}
          name="district"
          render={({ field: { value, onChange } }) => (
            <View style={styles.districtWrapper}>
              <Pressable
                style={[
                  styles.districtButton,
                  errors.district && styles.districtButtonError,
                ]}
                onPress={() => setIsDistrictOpen(!isDistrictOpen)}
              >
                <Text
                  style={[
                    styles.districtButtonText,
                    !value && styles.districtButtonPlaceholder,
                  ]}
                >
                  {districtLabel}
                </Text>
                <Ionicons
                  name={isDistrictOpen ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={COLORS.gray500}
                />
              </Pressable>

              {isDistrictOpen && (
                <View style={styles.districtDropdown}>
                  {DISTRICT_LIST.map((district) => (
                    <Pressable
                      key={district.value}
                      style={[
                        styles.districtOption,
                        value === district.value &&
                          styles.districtOptionSelected,
                      ]}
                      onPress={() => {
                        onChange(district.value);
                        setIsDistrictOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.districtOptionText,
                          value === district.value &&
                            styles.districtOptionTextSelected,
                        ]}
                      >
                        {district.label}
                      </Text>
                      {value === district.value && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color={COLORS.interactive}
                        />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}

              {errors.district && (
                <Text style={styles.errorText}>{errors.district.message}</Text>
              )}
            </View>
          )}
        />

        <Text style={[styles.label, styles.spacing]}>
          Tipos de Pokémon favoritos * (Máximo 2)
        </Text>

        {selectedTypes && selectedTypes.length > 0 && (
          <View style={styles.selectedTypesInfo}>
            <Text style={styles.selectedTypesLabel}>Seleccionados:</Text>
            <View style={styles.selectedTypesBadges}>
              {selectedTypes.map((type) => (
                <View key={type} style={styles.typeBadge}>
                  <Text style={styles.typeBadgeEmoji}>
                    {POKEMON_TYPE_EMOJIS[type]}
                  </Text>
                  <Text style={styles.typeBadgeText}>
                    {POKEMON_TYPE_LABELS[type]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={styles.typesGrid}>
          {ALL_POKEMON_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type);
            const canSelect = isSelected || selectedTypes.length < 2;

            return (
              <Pressable
                key={type}
                style={[
                  styles.typeCard,
                  isSelected && styles.typeCardSelected,
                  !canSelect && styles.typeCardDisabled,
                ]}
                onPress={() => canSelect && handleTypeToggle(type)}
                disabled={!canSelect}
              >
                {isSelected && (
                  <View style={styles.checkIcon}>
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                )}

                <Text style={styles.typeEmoji}>
                  {POKEMON_TYPE_EMOJIS[type]}
                </Text>
                <Text style={styles.typeName}>{POKEMON_TYPE_LABELS[type]}</Text>
              </Pressable>
            );
          })}
        </View>

        {errors.favoriteTypes && (
          <Text style={styles.errorText}>{errors.favoriteTypes.message}</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Atrás"
          variant="outline"
          onPress={handleGoBack}
          width="50%"
        />

        <PrimaryButton
          title="Continuar"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
          width="50%"
        />
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
    paddingBottom: 100,
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray900,
    marginTop: 32,
    marginBottom: 12,
  },

  spacing: {
    marginTop: 40,
  },

  districtWrapper: {
    marginBottom: 8,
  },

  districtButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },

  districtButtonError: {
    borderColor: COLORS.error,
  },

  districtButtonText: {
    fontSize: 16,
    color: COLORS.gray900,
    fontWeight: '500',
  },

  districtButtonPlaceholder: {
    color: COLORS.gray500,
    fontWeight: '400',
  },

  districtDropdown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderTopWidth: 0,
    backgroundColor: COLORS.backgroundType,
    overflow: 'hidden',
    marginBottom: 12,
    zIndex: 1000,
  },

  districtOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  districtOptionSelected: {
    backgroundColor: COLORS.backgroundType,
  },

  districtOptionText: {
    fontSize: 16,
    color: COLORS.gray900,
  },

  districtOptionTextSelected: {
    fontWeight: '700',
    color: COLORS.interactive,
  },

  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
  },

  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  typeCard: {
    width: '31%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
    backgroundColor: COLORS.surface,
  },

  typeCardSelected: {
    borderWidth: 2,
    borderColor: COLORS.interactive,
    backgroundColor: COLORS.backgroundType,
  },

  typeCardDisabled: {
    opacity: 0.5,
  },

  checkIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.interactive,
    justifyContent: 'center',
    alignItems: 'center',
  },

  typeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },

  typeName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray900,
    textAlign: 'center',
  },

  selectedTypesInfo: {
    backgroundColor: COLORS.backgroundType,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  selectedTypesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: 12,
  },

  selectedTypesBadges: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
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

  typeBadgeEmoji: {
    fontSize: 18,
  },

  typeBadgeText: {
    fontSize: 12,
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
  },
});
