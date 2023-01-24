import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './Slices/filterSlice'
import cart from './Slices/cartSlice'


export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch