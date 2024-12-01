import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, TAuthResponse, TRegisterData } from '@api';
export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'registerUser',
  async (
    userData: TRegisterData,
    { rejectWithValue }
  ): Promise<TAuthResponse> => await registerUserApi(userData)
);
