import { StateSchema } from '../../store';

export const selectOrders = (state: StateSchema) => state.feed.orders;

export const selectFeed = (state: StateSchema) => state.feed.feed;

export const selectOrder = (state: StateSchema) => state.feed.order;

export const selectIsLoading = (state: StateSchema) => state.feed.isLoading;

export const selectError = (state: StateSchema) => state.feed.error;
