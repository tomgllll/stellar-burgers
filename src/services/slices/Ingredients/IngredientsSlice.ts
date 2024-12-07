import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from './features/getIngredients';
import { IngredientsSchema } from './types';

const initialState: IngredientsSchema = {
  isLoading: false,
  error: '',
  ingredients: {
    buns: [],
    mains: [],
    sauces: []
  }
};

const IngredientsSlice = createSlice({
  name: 'IngredientsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || 'Произошла ошибка';
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.isLoading = false;

      state.ingredients.buns = [];
      state.ingredients.mains = [];
      state.ingredients.sauces = [];

      // Распределяем на составные части
      action.payload.data.forEach((ingredient) => {
        if (ingredient.type === 'bun') {
          state.ingredients.buns.push(ingredient);
        } else if (ingredient.type === 'main') {
          state.ingredients.mains.push(ingredient);
        } else if (ingredient.type === 'sauce') {
          state.ingredients.sauces.push(ingredient);
        }
      });
    });
  }
});

export const { actions: ingredientsActions, reducer: ingredientsReducer } =
  IngredientsSlice;
