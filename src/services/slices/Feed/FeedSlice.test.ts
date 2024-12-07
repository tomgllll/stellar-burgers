import { FeedState } from './types';
import FeedSlice, { feedReducer } from './FeedSlice';
import { fetchOrders } from './features/fetchOrders';
import feedSlice from './FeedSlice';
import { fetchOrder } from './features/fetchOrder';

describe('Проверяет редьюсер слайса FeedSlice', () => {
  describe('Проверка асинхронного экшена fetchOrders', () => {
    test('проверка экшена fetchOrders.pending', () => {
      const initialState: FeedState = {
        orders: [],
        ingredients: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        error: 'some error',
        number: 0,
        order: null
      };

      const action = {
        type: fetchOrders.pending.type,
        payload: null
      };

      const updatedState = feedReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe(null);
    });

    test('проверка экшена fetchOrders.rejected', () => {
      const initialState: FeedState = {
        orders: [],
        ingredients: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: true,
        error: null,
        number: 0,
        order: null
      };

      const action = {
        type: fetchOrders.rejected.type,
        error: { message: 'test message' }
      };

      const updatedState = feedReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('test message');
    });

    test('проверка экшена fetchOrders.fulfilled', () => {
      const initialState: FeedState = {
        orders: [],
        ingredients: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: true,
        error: null,
        number: 0,
        order: null
      };

      const ordersFromServer = [
        {
          _id: '67540c52e367de001daf7607',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2024-12-07T08:50:26.229Z',
          updatedAt: '2024-12-07T08:50:26.991Z',
          number: 61798
        },
        {
          _id: '67540a39e367de001daf7600',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942'
          ],
          status: 'done',
          name: 'Space краторный бессмертный минеральный альфа-сахаридный экзо-плантаго spicy бургер',
          createdAt: '2024-12-07T08:41:29.424Z',
          updatedAt: '2024-12-07T08:41:30.306Z',
          number: 61797
        }
      ];

      const action = {
        type: fetchOrders.fulfilled.type,
        payload: {
          orders: ordersFromServer,
          total: 2,
          totalToday: 100
        }
      };

      const updatedState = feedReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.orders).toEqual(ordersFromServer);
      expect(updatedState.feed.total).toBe(2);
      expect(updatedState.feed.totalToday).toBe(100);
    });
  });

  describe('Проверка асинхронного экшена fetchOrder', () => {
    test('проверка экшена fetchOrder.pending', () => {
      const initialState: FeedState = {
        orders: [],
        ingredients: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: false,
        error: 'some error',
        number: 0,
        order: null
      };

      const action = {
        type: fetchOrder.pending.type,
        payload: null
      };

      const updatedState = feedReducer(initialState, action);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBe(null);
    });

    test('проверка экшена fetchOrder.rejected', () => {
      const initialState: FeedState = {
        orders: [],
        ingredients: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: true,
        error: null,
        number: 0,
        order: null
      };

      const action = {
        type: fetchOrder.rejected.type,
        error: { message: 'test message' }
      };

      const updatedState = feedReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.error).toBe('test message');
    });

    test('проверка экшена fetchOrder.fulfilled', () => {
      const initialState: FeedState = {
        orders: [],
        ingredients: [],
        feed: {
          total: 0,
          totalToday: 0
        },
        isLoading: true,
        error: null,
        number: 0,
        order: null
      };

      const ordersFromServer = [
        {
          _id: '67540c52e367de001daf7607',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2024-12-07T08:50:26.229Z',
          updatedAt: '2024-12-07T08:50:26.991Z',
          number: 61798
        }
      ];

      const action = {
        type: fetchOrder.fulfilled.type,
        payload: {
          orders: ordersFromServer
        }
      };

      const updatedState = feedReducer(initialState, action);

      expect(updatedState.isLoading).toBe(false);
      expect(updatedState.order).toEqual(ordersFromServer[0]);
    });
  });
});
