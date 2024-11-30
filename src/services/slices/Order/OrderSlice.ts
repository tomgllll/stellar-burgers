import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { placeOrder } from './features/placeOrder';
import { OrderState } from './types';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

const initialState: OrderState = {
  ingredients: [],
  bun: null,
  loading: false,
  orderDetails: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    reorderIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      const { index, direction } = action.payload;
      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < state.ingredients.length) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[newIndex];
        state.ingredients[newIndex] = temp;
      }
    },
    resetOrder: (state) => {
      state.ingredients = [];
      state.bun = null;
      state.loading = false;
      state.orderDetails = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload.order;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Ошибка при создании заказа';
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  reorderIngredient,
  resetOrder
} = orderSlice.actions;
export default orderSlice.reducer;
