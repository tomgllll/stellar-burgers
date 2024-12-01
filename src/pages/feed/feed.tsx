import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectOrders } from '../../services/slices/Feed/selectors';
import { fetchOrders } from '../../services/slices/Feed/features/fetchOrders';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchOrders());
      }}
    />
  );
};
