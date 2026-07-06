import * as yup from 'yup';
import { PokemonType } from '../../theme';

export const schemaStep1 = yup.object({
  name: yup
    .string()
    .required('El nombre completo es obligatorio')
    .min(5, 'Debe tener al menos 5 caracteres'),

  age: yup
    .number()
    .typeError('La edad es obligatoria')
    .required('La edad es obligatoria')
    .min(10, 'Debes ser mayor de 10 años'),

  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Ingresa un correo electrónico válido'),
});

export const step2Schema = yup.object({
  district: yup.string().required('Selecciona un distrito'),
  favoriteTypes: yup
    .array()
    .of(yup.mixed<PokemonType>())
    .required('Selecciona al menos un tipo de Pokémon')
    .max(2, 'Puedes seleccionar máximo 2 tipos de Pokémon'),
});
