import { Action, ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { registerUser } from './features/registerUser';
import { AuthSchema } from './types';
import { loginUser } from './features/loginUser';
import { localStorageKeys } from '../../../utils/constants';
import { logoutUser } from './features/logoutUser';
import { updateUser } from './features/updateUser';
import { getOrders } from './features/getOrders';

const initialState: AuthSchema = {
  isLoading: false,
  data: null,
  error: '',
  usersOrders: []
};

function isRejectedAction(action: Action): action is Action {
  return action.type.endsWith('rejected');
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    initAuthUser: (state) => {
      const user = localStorage.getItem(localStorageKeys.user);
      console.log('getting user', user);
      if (user) {
        state.data = JSON.parse(user);
      }
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthSchema>) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      localStorage.setItem(
        localStorageKeys.user,
        JSON.stringify(action.payload)
      );
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      localStorage.setItem(
        localStorageKeys.user,
        JSON.stringify(action.payload)
      );
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = null;
      localStorage.clear();
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!state.data) return;
      state.data.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(state.data));
    });

    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersOrders = action.payload;
    });

    builder.addMatcher(isRejectedAction, (state, action) => {
      state.isLoading = false;
      state.error = 'Произошла ошибка';
    });
  }
});

export const { actions: authActions, reducer: authReducer } = authSlice;
