import { TOrder, TIngredient } from 'src/utils/types';

export interface FeedState {
  orders: TOrder[];
  ingredients: TIngredient[];
  feed: {
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | null;
  number: number;
  order: TOrder | null;
}