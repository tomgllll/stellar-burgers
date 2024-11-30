import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi, TIngredientsResponse } from '@api';

export const getIngredients = createAsyncThunk<TIngredientsResponse, void>(
  'getIngredients',
  async (): Promise<TIngredientsResponse> => {
    const response = await getIngredientsApi();
    return {
      success: true,
      data: response
    };
  }
);
