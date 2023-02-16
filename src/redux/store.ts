import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import cart from './cart/slice';
import pizza from './pizza/slice';
import filter from './filter/slice';

export const store = configureStore({
  reducer: { filter, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
