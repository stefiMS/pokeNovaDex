import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { COLORS } from '../theme';
import { Stepper } from '../components/Stepper';
import { TextFieldInput } from '../components/TextFieldInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { schemaStep1 } from '../utils';
import { useTrainerStore } from '../store/useTrainerStore';
import { Step1ScreenNavigationProp } from '../types/forms';

type FormData = yup.InferType<typeof schemaStep1>;

export const Step1Screen = () => {
  const navigation = useNavigation<Step1ScreenNavigationProp>();
  const setTrainer = useTrainerStore((state) => state.setTrainer);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schemaStep1),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setTrainer({
      fullName: data.name,
      age: data.age,
      email: data.email,
    });
    navigation.navigate('TrainerStep2');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Stepper currentStep={1} totalSteps={3} />

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <TextFieldInput
                label="Nombre completo"
                required
                value={value}
                onChangeText={onChange}
                placeholder="Ash Ketchum"
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="age"
            render={({ field: { value, onChange } }) => (
              <TextFieldInput
                label="Edad"
                required
                value={value?.toString() ?? ''}
                onChangeText={(text) =>
                  onChange(text === '' ? undefined : Number(text))
                }
                keyboardType="numeric"
                placeholder="15"
                error={errors.age?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <TextFieldInput
                label="Correo electrónico"
                required
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="ash@pokemon.com"
                error={errors.email?.message}
              />
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Continuar"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
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
    paddingTop: 32,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray900,
  },

  form: {
    marginTop: 32,
  },

  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
});
