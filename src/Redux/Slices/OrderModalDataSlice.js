import { createSlice } from '@reduxjs/toolkit'
import { doLogout } from "../Shared/ActionCreators";

const initialState = { route: {}, orderForModal: {}, startPointData: {}, finalPointData: {} }

const orderModalDataSlice = createSlice({
    name: 'modalData',
    initialState,
    reducers: {
        createModalOrder: (state, action) => {
            state.orderForModal = { ...action.payload[0] }
            state.route = { ...action.payload[1] }
            state.startPointData = { ...action.payload[2] }
            state.finalPointData = { ...action.payload[3] }

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

export default orderModalDataSlice.reducer
export const { createModalOrder } = orderModalDataSlice.actions