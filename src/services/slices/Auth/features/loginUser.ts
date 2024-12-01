import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, TAuthResponse, TLoginData } from '@api';

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'loginUser',
  async (data: TLoginData): Promise<TAuthResponse> => await loginUserApi(data)
);
