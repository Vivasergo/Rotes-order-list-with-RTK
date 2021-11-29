import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../Service/api'

export const doLogin = createAsyncThunk(
    'authorization/login',
    async (formData, { dispatch, rejectWithValue }) => {
        const response = await api.login(formData)
        return response.data
    }
)

const initialState = { isAuth: false }

const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        loggingOut: (state) => {
            console.log("Logout call");
            sessionStorage.clear()
            state.isAuth = false
        },
        authorized: (state) => {
            state.isAuth = true
        },
    },
    extraReducers: {
        [doLogin.pending]: (state) => {
            console.log('pending auth')
        },
        [doLogin.rejected]: (state, action) => {
            console.log('rejected auth, action', action)
        },
        [doLogin.fulfilled]: (state, action) => {
            state.isAuth = true
            sessionStorage['accessToken'] = action.payload.access_token
        },
    },
})

export default authSlice.reducer
export const { loggingOut, authorized } = authSlice.actions
