import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/Ingredients/selectors';

export const IngredientDetails: FC = () => {
  const ingredients = [
    ...useSelector(selectIngredients).buns,
    ...useSelector(selectIngredients).mains,
    ...useSelector(selectIngredients).sauces
  ];
  const ingredientData = ingredients.find(
    (item) => item._id === useParams().id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
