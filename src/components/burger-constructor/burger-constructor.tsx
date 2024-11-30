import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { resetOrder } from '../../services/slices/Order/OrderSlice';
import { placeOrder } from '../../services/slices/Order/features/placeOrder';
import {
  selectConstructorIngredients,
  selectBun,
  selectOrderDetails,
  selectOrderRequest
} from '../../services/slices/Order/selectors';
import { getAuthUser } from '../../services/slices/Auth/selectors';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bun = useSelector(selectBun);
  const ingredients = useSelector(
    selectConstructorIngredients
  ) as TConstructorIngredient[];
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderDetails);
  const user = useSelector(getAuthUser);
  const constructorItems = {
    bun: bun || null,
    ingredients
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const orderData: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];
    dispatch(placeOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
