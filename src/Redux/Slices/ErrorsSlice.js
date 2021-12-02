import { createSlice } from '@reduxjs/toolkit'
import { doLogout } from '../Shared/ActionCreators'

const initialState = { isError: false, errorMessage: '' }

const errorsSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        createError: (state, action) => {
            console.log('action', action)
            state.isError = true
            state.errorMessage = action.payload
        },
        deleteError: (state) => {
            state.isError = false
            state.errorMessage = ''
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(doLogout, (state, action) => {
            console.log('logout')
            state.isError = false
            state.errorMessage = ''
        })
    }
})

export default errorsSlice.reducer
export const { createError, deleteError } = errorsSlice.actions
