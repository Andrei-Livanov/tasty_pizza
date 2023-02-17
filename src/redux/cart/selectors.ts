import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.filter((obj) => obj.id === id);
