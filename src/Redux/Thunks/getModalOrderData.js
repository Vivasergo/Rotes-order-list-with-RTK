import { changeLoadingStatus } from "../Slices/LoadingSlice";
import { api } from "../../Service/api";
import { createError, deleteError } from "../Slices/ErrorsSlice";
import { createModalOrder } from "../Slices/OrderModalDataSlice";

export const getModalOrderData = (order) => async (dispatch) => {

    const validateResponse = (response) => {
        if (response.some(responseItem => !responseItem)) {
            throw new Error('Server response error')
        }
        else {
            response.forEach((responseItem) => {
                if (!!responseItem.status && responseItem.status !== 200) {
                    throw new Error(responseItem.data.error.message)
                }
                else if(!!responseItem.status && !!responseItem.data?.error){
                    throw new Error(responseItem.data.error)
                }
            })
        }

    }

    try {
        dispatch(changeLoadingStatus(true))

        const response = await Promise.all([
            api.fetchRoute(order.source, order.destination),
            api.fetchRoutePoint(order.source),
            api.fetchRoutePoint(order.destination)
        ])

        validateResponse(response)

        const [route, startPoint, finalPoint] = [response[0].data, response[1].data, response[2].data]
        dispatch(deleteError())
        dispatch(createModalOrder([order, route, startPoint, finalPoint]))
        dispatch(changeLoadingStatus(false))
    }
    catch (error) {
        dispatch(changeLoadingStatus(false))
        return dispatch(createError(error.message))
    }
}