import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async () => await getFeedsApi()
);
