import { AuthSchema } from './types';
import { authActions, authReducer } from './AuthSlice';
import { IngredientsSchema } from '../Ingredients/types';
import { getIngredients } from '../Ingredients/features/getIngredients';
import { ingredientsReducer } from '../Ingredients/IngredientsSlice';
import { registerUser } from './features/registerUser';
import { loginUser } from './features/loginUser';
import { logoutUser } from './features/logoutUser';
import { updateUser } from './features/updateUser';
import { FeedState } from '../Feed/types';
import { fetchOrders } from '../Feed/features/fetchOrders';
import { feedReducer } from '../Feed/FeedSlice';
import { getOrders } from './features/getOrders';

// assertions as usual:

const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },
    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },
    removeItem(key: string): void {
      delete store[key];
    },
    clear(): void {
      store = {};
    }
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

describe('Проверяет редьюсер слайса AuthSlice', () => {
  describe('Проверка экшена initAuthUser', () => {
    test('проверка экшена initAuthUser без пользователя в localStorage', () => {
      const initialState: AuthSchema = {
        isLoading: false,
        data: null,
        error: '',
        usersOrders: []
      };

      const action = authActions.initAuthUser();

      const updatedState = authReducer(initialState, action);

      expect(updatedState.data).toBeNull();
    });

    test('проверка экшена initAuthUser с пользователем в localStorage', () => {
      const initialState: AuthSchema = {
        isLoading: false,
        data: null,
        error: '',
        usersOrders: []
      };

      localStorage.setItem(
        'user',
        JSON.stringify({
          success: true,
          accessToken: 'Bearer test',
          refreshToken: '1234',
          user: { email: 'test@gmail.com', name: 'test' }
        })
      );

      const action = authActions.initAuthUser();

      const updatedState = authReducer(initialState, action);

      expect(updatedState.data).toEqual({
        success: true,
        accessToken: 'Bearer test',
        refreshToken: '1234',
        user: { email: 'test@gmail.com', name: 'test' }
      });

      localStorage.clear();
    });
  });

  describe('Проверка асинхронного экшена registerUser', () => {
    test('проверка экшена registerUser.pending', () => {
      const initialState: AuthSchema = {
        isLoading: false,
        data: null,
        error: 'some-error',
        usersOrders: []
      };

      const action = {
        type: registerUser.pending.type,
        payload: null
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe('');
    });

    test('проверка экшена registerUser.rejected', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: null,
        error: '',
        usersOrders: []
      };

      const action = {
        type: registerUser.rejected.type,
        payload: { error: 'Произошла ошибка' }
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('Произошла ошибка');
    });

    test('проверка экшена registerUser.fulfilled', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: null,
        error: '',
        usersOrders: []
      };

      const user = {
        success: true,
        accessToken: 'Bearer test',
        refreshToken: '1234',
        user: { email: 'test@gmail.com', name: 'test' }
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: user
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.data).toEqual(user);
      expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual(user);

      localStorage.clear();
    });
  });

  describe('Проверка асинхронного экшена loginUser', () => {
    test('проверка экшена loginUser.pending', () => {
      const initialState: AuthSchema = {
        isLoading: false,
        data: null,
        error: 'some-error',
        usersOrders: []
      };

      const action = {
        type: loginUser.pending.type,
        payload: null
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe('');
    });

    test('проверка экшена loginUser.rejected', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: null,
        error: '',
        usersOrders: []
      };

      const action = {
        type: loginUser.rejected.type,
        payload: { error: 'Произошла ошибка' }
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('Произошла ошибка');
    });

    test('проверка экшена loginUser.fulfilled', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: null,
        error: '',
        usersOrders: []
      };

      const user = {
        success: true,
        accessToken: 'Bearer test',
        refreshToken: '1234',
        user: { email: 'test@gmail.com', name: 'test' }
      };

      const action = {
        type: loginUser.fulfilled.type,
        payload: user
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.data).toEqual(user);
      expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual(user);

      localStorage.clear();
    });
  });

  describe('Проверка асинхронного экшена logoutUser', () => {
    test('проверка экшена logoutUser.pending', () => {
      const initialState: AuthSchema = {
        isLoading: false,
        data: null,
        error: 'some-error',
        usersOrders: []
      };

      const action = {
        type: logoutUser.pending.type,
        payload: null
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe('');
    });

    test('проверка экшена logoutUser.rejected', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: null,
        error: '',
        usersOrders: []
      };

      const action = {
        type: logoutUser.rejected.type,
        payload: { error: 'Произошла ошибка' }
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('Произошла ошибка');
    });

    test('проверка экшена logoutUser.fulfilled', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: {
          success: true,
          accessToken: 'Bearer test',
          refreshToken: '1234',
          user: { email: 'test@gmail.com', name: 'test' }
        },
        error: '',
        usersOrders: []
      };

      const action = {
        type: logoutUser.fulfilled.type,
        payload: null
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.data).toEqual(null);
      expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual({});

      localStorage.clear();
    });
  });

  describe('Проверка асинхронного экшена updateUser', () => {
    test('проверка экшена updateUser.pending', () => {
      const initialState: AuthSchema = {
        isLoading: false,
        data: null,
        error: 'some-error',
        usersOrders: []
      };

      const action = {
        type: updateUser.pending.type,
        payload: null
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe('');
    });

    test('проверка экшена updateUser.rejected', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: null,
        error: '',
        usersOrders: []
      };

      const action = {
        type: updateUser.rejected.type,
        payload: { error: 'Произошла ошибка' }
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('Произошла ошибка');
    });

    test('проверка экшена updateUser.fulfilled', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: {
          success: true,
          accessToken: 'Bearer test',
          refreshToken: '1234',
          user: { email: 'test@gmail.com', name: 'test' }
        },
        error: '',
        usersOrders: []
      };

      const data = {
        success: true,
        accessToken: 'Bearer test',
        refreshToken: '1234',
        user: { email: 'test@gmail.com', name: 'test' }
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: data
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.data?.user).toEqual(data.user);
      expect(JSON.parse(localStorage.getItem('user') || '{}')).toEqual(data);

      localStorage.clear();
    });
  });

  describe('Проверка асинхронного экшена getOrders', () => {
    test('проверка экшена getOrders.pending', () => {
      const initialState: AuthSchema = {
        isLoading: false,
        data: {
          success: true,
          accessToken: 'Bearer test',
          refreshToken: '1234',
          user: { email: 'test@gmail.com', name: 'test' }
        },
        error: 'some-error',
        usersOrders: []
      };

      const action = {
        type: getOrders.pending.type,
        payload: null
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe('');
    });

    test('проверка экшена getOrders.rejected', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: {
          success: true,
          accessToken: 'Bearer test',
          refreshToken: '1234',
          user: { email: 'test@gmail.com', name: 'test' }
        },
        error: '',
        usersOrders: []
      };

      const action = {
        type: getOrders.rejected.type,
        payload: {
          error: 'Произошла ошибка'
        }
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('Произошла ошибка');
    });

    test('проверка экшена getOrders.fulfilled', () => {
      const initialState: AuthSchema = {
        isLoading: true,
        data: {
          success: true,
          accessToken: 'Bearer test',
          refreshToken: '1234',
          user: { email: 'test@gmail.com', name: 'test' }
        },
        error: '',
        usersOrders: []
      };

      const ordersFromServer = [
        {
          _id: '67540c52e367de001daf7607',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2024-12-07T08:50:26.229Z',
          updatedAt: '2024-12-07T08:50:26.991Z',
          number: 61798
        },
        {
          _id: '67540a39e367de001daf7600',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942'
          ],
          status: 'done',
          name: 'Space краторный бессмертный минеральный альфа-сахаридный экзо-плантаго spicy бургер',
          createdAt: '2024-12-07T08:41:29.424Z',
          updatedAt: '2024-12-07T08:41:30.306Z',
          number: 61797
        }
      ];

      const action = {
        type: getOrders.fulfilled.type,
        payload: ordersFromServer
      };

      const updatedState = authReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.usersOrders).toEqual(ordersFromServer);
    });
  });
});
