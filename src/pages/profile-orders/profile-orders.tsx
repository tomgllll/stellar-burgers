import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrders } from '../../services/slices/Feed/selectors';
import { fetchOrders } from '../../services/slices/Feed/features/fetchOrders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return <ProfileOrdersUI orders={orders} />;
};
