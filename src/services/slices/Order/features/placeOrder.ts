import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TNewOrderResponse } from 'src/utils/burger-api';

export const placeOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'placeOrder',
  async (ingredientIds: string[]): Promise<TNewOrderResponse> => {
    const response = await orderBurgerApi(ingredientIds);
    return response;
  }
);
