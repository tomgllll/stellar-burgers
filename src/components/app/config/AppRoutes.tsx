import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { appPaths } from '../../../utils/constants';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  Register,
  ResetPassword,
  ProfileOrders
} from '@pages';
import { Modal } from '../../modal';
import { OrderInfo } from '../../order-info';
import { IngredientDetails } from '../../ingredient-details';
import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path={appPaths.MAIN} element={<ConstructorPage />} />
        <Route path={appPaths.FEED} element={<Feed />} />
        <Route
          path={appPaths.LOGIN}
          element={<ProtectedRoute element={<Login />} />}
        />
        <Route
          path={appPaths.REGISTER}
          element={<Register />}
          // element={<ProtectedRoute element={<Register />} />}
        />
        <Route
          path={appPaths.FORGOT_PASSWORD}
          element={<ProtectedRoute element={<ForgotPassword />} />}
        />
        <Route
          path={appPaths.RESET_PASSWORD}
          element={<ProtectedRoute element={<ResetPassword />} />}
        />
        <Route
          path={appPaths.PROFILE}
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path={appPaths.ORDERS}
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route
          path={appPaths.ORDER}
          element={<ProtectedRoute element={<OrderInfo />} />}
        />
        <Route
          path={appPaths.INGREDIENT}
          element={<ProtectedRoute element={<IngredientDetails />} />}
        />
        <Route
          path={appPaths.PROFILE_ORDER}
          element={<ProtectedRoute element={<OrderInfo />} />}
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модалки */}
      {background && (
        <Routes>
          <Route
            path={appPaths.ORDER}
            element={
              <Modal
                title={'#' + location.pathname.split('/').pop() || ''}
                onClose={() => {
                  navigate(background);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={appPaths.INGREDIENT}
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  navigate(background);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={appPaths.PROFILE_ORDER}
            element={
              <Modal
                title={'#' + location.pathname.split('/').pop() || ''}
                onClose={() => {
                  navigate(background);
                }}
              >
                <ProtectedRoute element={<OrderInfo />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
