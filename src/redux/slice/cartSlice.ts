import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItemsType = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  type: string,
  size: number,
  count: number;
};

interface CartSliceInterface {
  totalPrice: number;
  items: CartItemsType[];
}

const initialState: CartSliceInterface = {
  totalPrice: 0,
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPitca(state, action: PayloadAction<CartItemsType>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      },

      // plusPitca (state, action ) {
      //   const findItem = state.items.find ((obj) => obj.id === action.payload);
      //   if (findItem) {
      //     findItem.count++;
      //   }
      // },

      minusPitca (state, action: PayloadAction<string> ) {
        const findItem = state.items.find ((obj) => obj.id === action.payload);
        if (findItem) {
          findItem.count--;
        }
      },
    
      removePitca(state,action) {
       state.items = state.items.filter((obj) => obj.id !== action.payload);
      },
      clearPitca (state) {
        state.items = [];
        state.totalPrice = 0;
      }
    },
  }  
);

export const cartSelector = (state: RootState) => state.cartSlice;
export const selectCartItemById = (id: string) => (state: RootState) => state.cartSlice.items.find((obj) => obj.id === id)

export const {addPitca, removePitca, clearPitca, minusPitca} = cartSlice.actions;

export default cartSlice.reducer;