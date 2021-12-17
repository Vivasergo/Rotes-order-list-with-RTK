import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/AuthSlice'
import errorsSlice from './Slices/ErrorsSlice'
import loadingReducer from './Slices/LoadingSlice'
import ordersReducer from './Slices/OrdersSlice'
import orderModalDataReducer from './Slices/OrderModalDataSlice'

export const store = configureStore({
    reducer: {
        authentication: authReducer,
        loading: loadingReducer,
        orders: ordersReducer,
        error: errorsSlice,
        modalData: orderModalDataReducer
    },
})