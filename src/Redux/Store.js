import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/AuthSlice'
import ErrorsSlice from './Slices/ErrorsSlice'
import loadingReducer from './Slices/LoadingSlice'

export const store = configureStore({
    reducer: {
        authentication: authReducer,
        loading: loadingReducer,
        error: ErrorsSlice,
    },
})