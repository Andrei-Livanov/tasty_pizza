import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItemType, CartSliceState } from './types';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemOrDelete(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
      );

      switch (action.payload.mathSign) {
        case 'plus':
          findItem
            ? findItem.count++
            : state.items.push({ ...action.payload, count: 1 });
          break;
        case 'minus':
          if (findItem) findItem.count--;
          break;
        case 'remove':
          state.items = state.items.filter((obj) => obj !== findItem);
          break;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemOrDelete, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
