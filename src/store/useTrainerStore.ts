import { create } from 'zustand';
type TrainerData = {
  fullName: string;
  age: number;
  email: string;
  district: string;
  favoriteType: string;
};

type TrainerStore = {
  trainer: TrainerData;
  setTrainer: (data: Partial<TrainerData>) => void;
};

export const useTrainerStore = create<TrainerStore>((set) => ({
  trainer: {
    fullName: '',
    age: 0,
    email: '',
    district: '',
    favoriteType: '',
  },

  setTrainer: (data) =>
    set((state) => ({
      trainer: {
        ...state.trainer,
        ...data,
      },
    })),
}));
