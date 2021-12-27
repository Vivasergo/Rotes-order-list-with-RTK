import { createSlice } from '@reduxjs/toolkit'
import { doLogout } from "../Shared/ActionCreators";

const initialState = []

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        createOrders: (state, action) => {
           // noinspection JSUnusedAssignment
            return state = [...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(doLogout, (state) => {
               // noinspection JSUnusedAssignment
                return state = initialState
            })
    },
})

export default orderSlice.reducer
export const { createOrders } = orderSlice.actions