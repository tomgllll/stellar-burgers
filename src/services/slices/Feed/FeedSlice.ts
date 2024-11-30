import { createSlice } from '@reduxjs/toolkit';
import { FeedState } from './types';
import { fetchOrder } from './features/fetchOrder';
import { fetchOrders } from './features/fetchOrders';

const initialState: FeedState = {
  orders: [],
  ingredients: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null,
  number: 0,
  order: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // обработка fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || 'Ошибка загрузки заказов';
      })
      // обработка fetchOrder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || 'Ошибка загрузки заказа';
      });
  }
});

export const feedReducer = feedSlice.reducer;
export default feedSlice;
