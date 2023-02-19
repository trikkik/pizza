import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type FilterSortState = {
  name: string;
  sortProp: 'raiting' | 'price' | 'Alph' | '-raiting' | '-price' | '-Alph';
}

interface FilterSlicaState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: FilterSortState;
}

const initialState: FilterSlicaState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
      name:'Популярности',
      sortProp:'raiting' ,
    }, 
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue (state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
        state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<FilterSortState>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action:PayloadAction<FilterSlicaState>) {
      if (Object.keys(action.payload).length) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name:'популярности',
          sortProp: 'raiting',
        }
      }
    }
  }  
});

export const sortSelector = (state: RootState) => state.filterSlice.sort;
export const filterSelector = (state: RootState) => state.filterSlice;

export const {setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;