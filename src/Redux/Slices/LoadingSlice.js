import { createSlice } from '@reduxjs/toolkit'

const initialState = { isLoading: false }

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        changeLoadingStatus: (state, action) => {
            state.isLoading = action.payload
        },
    },
})

export default loadingSlice.reducer
export const { changeLoadingStatus } = loadingSlice.actions
