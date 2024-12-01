import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { authReducer } from './slices/Auth/AuthSlice';
import { AuthSchema } from './slices/Auth/types';
import { ingredientsReducer } from './slices/Ingredients/IngredientsSlice';
import { IngredientsSchema } from './slices/Ingredients/types';
import orderReducer from './slices/Order/OrderSlice';
import { OrderState } from './slices/Order/types';
import { feedReducer } from './slices/Feed/FeedSlice';
import { FeedState } from './slices/Feed/types';

export type StateSchema = {
  auth: AuthSchema;
  ingredients: IngredientsSchema;
  order: OrderState;
  feed: FeedState;
};

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer
});

const store = configureStore<StateSchema>({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
