import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../Service/api'
import { doLogout } from '../Shared/ActionCreators'
import { createError, deleteError } from './ErrorsSlice'
import { changeLoadingStatus } from './LoadingSlice'

export const doLogin = createAsyncThunk(
    'authorization/login',
    async (formData, { dispatch, rejectWithValue }) => {
        dispatch(changeLoadingStatus(true))

        try {
            const response = await api.login(formData)
            if (response.status.toString()[0] === '4') {
                dispatch(createError(response.data.detail))
            } else if (response.status === 200) {
                dispatch(deleteError())
                sessionStorage['accessToken'] = response.data.access_token
                return response.data
            } else {
                throw new Error('Some error occurred')
            }
        } catch (error) {
            dispatch(createError(error))
        }
        dispatch(changeLoadingStatus(false))
    }
)

const initialState = { isAuth: false }

const authSlice = createSlice({
    name: 'authorization',
    initialState,
    reducers: {
        // logout: (state) => {
        //     sessionStorage.clear()
        //     state.isAuth = false
        // },
        authorized: (state) => {
            state.isAuth = true
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(doLogin.pending, (state) => {})
            .addCase(doLogin.rejected, (state, action) => {
                console.log('.addCase(doLogin.rejected ->action', action)
            })
            .addCase(doLogin.fulfilled, (state, action) => {
                state.isAuth = true
                sessionStorage['accessToken'] = action.payload.access_token
            })
            .addCase(doLogout, (state) => {
                sessionStorage.clear()
                state.isAuth = false
            })
    },
    // extraReducers: {
    //     [doLogin.pending]: (state) => {
    //         console.log('pending auth')
    //     },
    //     [doLogin.rejected]: (state, action) => {
    //         console.log('rejected auth, action', action)
    //     },
    //     [doLogin.fulfilled]: (state, action) => {
    //         state.isAuth = true
    //         sessionStorage['accessToken'] = action.payload.access_token
    //     },
    // },
})

export default authSlice.reducer
export const { authorized } = authSlice.actions

