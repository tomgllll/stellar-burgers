import { IngredientsSchema } from './types';
import { getIngredients } from './features/getIngredients';
import { ingredientsReducer } from './IngredientsSlice';

describe('Проверяет редьюсер слайса IngredientsSlice', () => {
  describe('Проверка асинхронного экшена getIngredients', () => {
    test('проверка экшена getIngredients.pending', () => {
      const initialState: IngredientsSchema = {
        isLoading: false,
        error: 'some error',
        ingredients: {
          buns: [],
          mains: [],
          sauces: []
        }
      };

      const action = {
        type: getIngredients.pending.type,
        payload: null
      };

      const updatedState = ingredientsReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe('');
    });

    test('проверка экшена getIngredients.rejected', () => {
      const initialState: IngredientsSchema = {
        isLoading: true,
        error: '',
        ingredients: {
          buns: [],
          mains: [],
          sauces: []
        }
      };

      const action = {
        type: getIngredients.rejected.type,
        error: { message: 'some-error' }
      };

      const updatedState = ingredientsReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('some-error');
    });

    test('проверка экшена getIngredients.fulfilled', () => {
      const initialState: IngredientsSchema = {
        isLoading: true,
        error: '',
        ingredients: {
          buns: [],
          mains: [],
          sauces: []
        }
      };

      const ingredientsFromServer = [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        }
      ];

      const action = {
        type: getIngredients.fulfilled.type,
        payload: {
          data: ingredientsFromServer
        }
      };

      const updatedState = ingredientsReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.ingredients.buns).toEqual([ingredientsFromServer[0]]);
      expect(updatedState.ingredients.mains).toEqual([
        ingredientsFromServer[1]
      ]);
      expect(updatedState.ingredients.sauces).toEqual([
        ingredientsFromServer[2]
      ]);
    });
  });
});
