import { TAuthResponse } from '@api';
import { TOrder } from '@utils-types';

export type AuthSchema = {
  data: TAuthResponse | null;
  isLoading: boolean;
  error: string;
  usersOrders: TOrder[],
};
