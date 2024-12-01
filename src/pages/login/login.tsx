import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/Auth/features/loginUser';
import { registerUser } from '../../services/slices/Auth/features/registerUser';
import { appPaths } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getAuth } from '../../services/slices/Auth/selectors';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector(getAuth);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(response)) {
      navigate(appPaths.MAIN);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
