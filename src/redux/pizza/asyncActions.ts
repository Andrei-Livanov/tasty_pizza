import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { Pizza, SearchPizzaParams } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, sortBy, order, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://63c51c19e1292e5bea1af867.mockapi.io/items`,
      {
        params: pickBy(
          {
            category,
            search,
            sortBy,
            order,
            page: currentPage,
            limit: 4,
          },
          identity
        ),
      }
    );
    return data;
  }
);
