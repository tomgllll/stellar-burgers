import { TIngredient } from '@utils-types';

// Тип данных заказа
export interface TOrder {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
}

// Тип состояния
export interface OrderState {
  ingredients: TIngredient[];
  bun: TIngredient | null;
  loading: boolean;
  orderDetails: TOrder | null;
  error: string | null;
}
