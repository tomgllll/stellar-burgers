import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUser } from '../../services/slices/Auth/features/registerUser';
import { useDispatch } from '../../services/store';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from '../../services/slices/Auth/selectors';
import { useSelector } from '../../services/store';
import { appPaths } from '../../utils/constants';
import { Preloader } from '@ui';

const URL = process.env.BURGER_API_URL;

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector(getAuth);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await dispatch(
      registerUser({ email, name: userName, password })
    );

    if (registerUser.fulfilled.match(response)) {
      navigate(appPaths.MAIN);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
