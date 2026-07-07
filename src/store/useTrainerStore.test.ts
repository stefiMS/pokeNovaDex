import { useTrainerStore } from './useTrainerStore';

describe('useTrainerStore', () => {
  beforeEach(() => {
    useTrainerStore.setState({
      trainer: {
        fullName: '',
        age: 0,
        email: '',
        district: '',
        favoriteType: '',
      },
    });
  });

  it('should initialize with default values', () => {
    const { trainer } = useTrainerStore.getState();

    expect(trainer).toEqual({
      fullName: '',
      age: 0,
      email: '',
      district: '',
      favoriteType: '',
    });
  });

  it('should update fullName', () => {
    useTrainerStore.getState().setTrainer({
      fullName: 'Ash Ketchum',
    });

    expect(useTrainerStore.getState().trainer.fullName).toBe('Ash Ketchum');
  });

  it('should update multiple fields', () => {
    useTrainerStore.getState().setTrainer({
      fullName: 'Ash Ketchum',
      age: 10,
      email: 'ash@pokemon.com',
    });

    expect(useTrainerStore.getState().trainer).toMatchObject({
      fullName: 'Ash Ketchum',
      age: 10,
      email: 'ash@pokemon.com',
    });
  });

  it('should preserve previous values when updating partially', () => {
    useTrainerStore.getState().setTrainer({
      fullName: 'Ash Ketchum',
      age: 10,
    });

    useTrainerStore.getState().setTrainer({
      district: 'Pallet Town',
    });

    expect(useTrainerStore.getState().trainer).toEqual({
      fullName: 'Ash Ketchum',
      age: 10,
      email: '',
      district: 'Pallet Town',
      favoriteType: '',
    });
  });

  it('should update favoriteType', () => {
    useTrainerStore.getState().setTrainer({
      favoriteType: 'electric',
    });

    expect(useTrainerStore.getState().trainer.favoriteType).toBe('electric');
  });
});
