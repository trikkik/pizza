import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type FetchParamsType =
//or Record<string, string>
{
  sortBy: string;
  currentPage: number;
  order: string;
  category: string;
  searchBy: string;
  
};

enum STATUS {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCSESS = 'succsess',
}

type ItemsState = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

interface PizzaSliceState {
  status: STATUS,
  items: ItemsState[],
}

export const fetchItem = createAsyncThunk (
  'pizza/fetchItemStatus',
  async(params: FetchParamsType) => {
    const {sortBy, currentPage, order, category, searchBy} = params;
    const {data} = await axios.get<ItemsState[]> (
      `https://637d01c916c1b892ebc56e93.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchBy}`
    );
    return data as ItemsState[];
  }
);


const initialState: PizzaSliceState = {
    items: [],
    status: STATUS.LOADING, // loading | succsess | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state) => {
      state.status = STATUS.LOADING;
      state.items = [];
    });
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.status = STATUS.SUCCSESS;
      state.items = action.payload;
    });
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.status = STATUS.ERROR;
      state.items = [];
    });
  }
  // extraReducers: {
  //   [fetchItem.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchItem.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'succsess'
  //   },
  //   [fetchItem.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // }
})

export const selectorPizzaData = (state: RootState) => state.pizzaSlice;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
