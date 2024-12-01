import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '@api';

export const logoutUser = createAsyncThunk<{ success: boolean }, void>(
  'logoutUser',
  async (): Promise<{ success: boolean }> => await logoutApi()
);
