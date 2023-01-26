import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './Slices/filterSlice'
import cart from './Slices/cartSlice'
import pizza from './Slices/pizzaSlice'


export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart,
        pizza
    }
})
