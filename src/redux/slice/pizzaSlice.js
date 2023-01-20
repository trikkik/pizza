import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItem = createAsyncThunk (
  'pizza/fetchItemStatus',
  async(params) => {
    const {sortBy, currentPage, order, category, searchBy} = params;
    const {data} = await axios.get (
      `https://637d01c916c1b892ebc56e93.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchBy}`
    );
    return data;
  }
)

const initialState = {
    items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload;
    }
  },
  // extraReducers: {
  //   [fetchItem.pending]: (state, action) => {
  //     console.log('Отправка...');
  //   },
  //   [fetchItem.fulfilled]: (state, action) => {
  //     console.log(state, 'ok');
  //   },
  //   // [fetchItem.rejected]: (state, action) => {
  //   //   console.log('error...');
  //   // },
  // }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
