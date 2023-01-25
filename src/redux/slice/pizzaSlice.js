import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItem = createAsyncThunk (
  'pizza/fetchItemStatus',
  async(params, thunkAPI) => {
    const {sortBy, currentPage, order, category, searchBy} = params;
    const {data} = await axios.get (
      `https://637d01c916c1b892ebc56e93.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchBy}`
    );

    console.log(thunkAPI);

    return data;
  }
);

const initialState = {
    items: [],
    status: 'loading', 
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    }
  },
  extraReducers: {
    [fetchItem.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchItem.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succsess'
    },
    [fetchItem.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  }
})

export const selectorPizzaData = (state) => state.pizzaSlice;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
