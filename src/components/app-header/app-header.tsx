import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getAuthUser } from '../../services/slices/Auth/selectors';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const authUser = useSelector(getAuthUser);
  return <AppHeaderUI userName={authUser?.name || ''} />;
};
