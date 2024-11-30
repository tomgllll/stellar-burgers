import { TAuthResponse } from '@api';

export type AuthSchema = {
  data: TAuthResponse | null;
  isLoading: boolean;
  error: string;
};
