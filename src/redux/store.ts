import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slice/filterSlice'
import cartSlice from './slice/cartSlice'
import pizzaSlice from './slice/pizzaSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzaSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
