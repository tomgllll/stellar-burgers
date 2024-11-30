import { StateSchema } from '../../store';

export const getAuthUser = ({ auth }: StateSchema) => auth.data?.user;
export const getAuth = ({ auth }: StateSchema) => auth;