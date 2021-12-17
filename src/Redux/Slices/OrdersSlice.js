import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        createOrders: (state, action) => {
           return state = [...action.payload]
        }
    },
})

export default orderSlice.reducer
export const { createOrders } = orderSlice.actions