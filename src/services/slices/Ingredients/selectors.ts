import { StateSchema } from '../../store';

export const selectIngredientsState = ({ ingredients }: StateSchema) =>
  ingredients;

export const selectIngredients = ({ ingredients }: StateSchema) =>
  ingredients.ingredients;
