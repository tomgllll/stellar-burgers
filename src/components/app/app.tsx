import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { authActions } from '../../services/slices/Auth/AuthSlice';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/Ingredients/features/getIngredients';
import { useDispatch } from '../../services/store';
import AppRoutes from './config/AppRoutes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.initAuthUser());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes />
    </div>
  );
};

export default App;
