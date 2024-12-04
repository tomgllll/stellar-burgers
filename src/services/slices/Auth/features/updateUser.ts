import { createAsyncThunk } from '@reduxjs/toolkit';
import { TLoginData, TRegisterData, TUserResponse, updateUserApi } from '@api';

export const updateUser = createAsyncThunk<TUserResponse, TRegisterData>(
  'updateUser',
  async (data: TLoginData): Promise<TUserResponse> => await updateUserApi(data)
);
