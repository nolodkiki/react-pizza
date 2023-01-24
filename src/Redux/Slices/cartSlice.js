import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalPrice: 0
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addPizzaItem(state, action) {
            
            const sameItem = state.items.find(obj => obj.id === action.payload.id)
            if (sameItem) {
                sameItem.count++
            } else {
                state.items.push({...action.payload, count: 1})
            }

            state.totalPrice = state.items.reduce((acc, obj) => {
                return (obj.price * obj.count) + acc
            }, 0)
        },
        minusPizzaItem(state, action) {
            const sameItem = state.items.find(obj => obj.id === action.payload.id)
            if (sameItem.count > 0) {
                sameItem.count--
            }
            state.totalPrice = state.items.reduce((acc, obj) => {
                return (obj.price * obj.count) - acc
            }, 0)
        },
        removePazzaItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
            state.totalPrice = state.items.reduce((acc, obj) => {
                return (obj.price * obj.count) - acc
            }, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const {addPizzaItem, minusPizzaItem, addTotalPrice, removePazzaItem, clearItems} = cartSlice.actions

export default cartSlice.reducer