import { changeLoadingStatus } from "../Slices/LoadingSlice";
import { api } from "../../Service/api";
import { createError, deleteError } from "../Slices/ErrorsSlice";
import { createModalOrder } from "../Slices/OrderModalDataSlice";

export const getModalOrderData = (order) => async (dispatch) => {
    const checkForErrorStatus = (response) => {
        const errorArray = []
        response.forEach((responseItem) => {
            // console.log('responseItem in checkForErrorStatus', responseItem);
            return !!responseItem.status && responseItem.status !== 200 ? errorArray.push(responseItem.data.error.message) : ''
        })
        return errorArray
    }

    try {
        dispatch(changeLoadingStatus(true))

        const response = await Promise.all([
            api.fetchRoute(order.source, order.destination),
            api.fetchRoutePoint(order.source),
            api.fetchRoutePoint(order.destination)
        ])
        console.log('response in try', response);
        if (response.some(responseItem => !responseItem)) {

            throw new Error('Server response error')
        }

        const errorStatusValidation = checkForErrorStatus(response)

        if (errorStatusValidation.length > 0) {
            dispatch(createError(errorStatusValidation[0]))
        }
        else {
            const [route, startPoint, finalPoint] = [response[0].data, response[1].data, response[2].data]
            dispatch(deleteError())
            dispatch(createModalOrder([order, route, startPoint, finalPoint]))
        }
        dispatch(changeLoadingStatus(false))
    }
    catch (error) {
        console.log('error in catch', error);

        dispatch(changeLoadingStatus(false))
       return dispatch(createError(error.message))
    }
}