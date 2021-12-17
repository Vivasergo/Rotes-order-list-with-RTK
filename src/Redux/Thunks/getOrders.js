import { changeLoadingStatus } from "../Slices/LoadingSlice";
import { api } from "../../Service/api";
import { createError, deleteError } from "../Slices/ErrorsSlice";
import { createOrders } from "../Slices/OrdersSlice";

export const getOrders = () => async (dispatch) => {
    try {
        dispatch(changeLoadingStatus(true))

        const response = await api.fetchOrders()

        if (!response) {
            throw new Error('Server response error')
        }
        else if (response.status !== 200) {
            dispatch(createError(response.data.detail))
        }
        else {
            dispatch(deleteError())
            dispatch(createOrders(response.data))
        }
        dispatch(changeLoadingStatus(false))
    }
    catch (error) {
        dispatch(changeLoadingStatus(false))
        dispatch(createError(error.message))
    }
}