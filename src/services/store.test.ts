import store, { rootReducer } from './store';

test('Проверяет правильную инициализацию rootReducer', () => {
  const expected = rootReducer(undefined, { type: 'some_action' });
  expect(expected).toEqual(store.getState());
});
