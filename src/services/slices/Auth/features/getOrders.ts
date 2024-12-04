import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk<TOrder[], void>(
  'getOrders',
  async (): Promise<TOrder[]> => await getOrdersApi()
);
