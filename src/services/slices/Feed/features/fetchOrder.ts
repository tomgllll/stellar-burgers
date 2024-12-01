import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

export const fetchOrder = createAsyncThunk(
  'feed/fetchOrder',
  async (number: number) => await getOrderByNumberApi(number)
);
