import { useSelector } from 'react-redux';
import { getAuth } from '../../../services/slices/Auth/selectors';
import { Login } from '@pages';

type Props = {
  element: JSX.Element;
};

const ProtectedRoute = (props: Props) => {
  const authData = useSelector(getAuth);
  const isAuth = authData.data?.success; // selector redux store

  return isAuth ? props.element : <Login />;
};

export default ProtectedRoute;
