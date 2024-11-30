import { TIngredient } from '@utils-types';

export type IngredientsSchema = {
  isLoading: boolean;
  error: string;
  ingredients: {
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];
  };
};
