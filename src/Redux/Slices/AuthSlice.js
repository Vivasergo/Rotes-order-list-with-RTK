import { createSlice} from '@reduxjs/toolkit'
import { doLogout } from '../Shared/ActionCreators'

const initialState = { isAuth: false }

const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        authorized: (state, action) => {
            state.isAuth = true
            sessionStorage['accessToken'] = action.payload.access_token
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(doLogout, (state) => {
                sessionStorage.clear()
                state.isAuth = false
            })
    },
})

export default authSlice.reducer
export const { authorized } = authSlice.actions

