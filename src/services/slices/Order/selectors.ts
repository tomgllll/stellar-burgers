import { StateSchema } from '../../store';

export const selectConstructorIngredients = (state: StateSchema) =>
  state.order.ingredients;

export const selectBun = (state: StateSchema) => state.order.bun;

export const selectOrderDetails = (state: StateSchema) =>
  state.order.orderDetails;

export const selectOrderRequest = (state: StateSchema) => state.order.loading;
