import React, { useEffect, useState } from 'react'
import { api } from '../../Service/api'
import Style from './style.module.css'
import { OrderModal } from '../Modal/OrderModal'
import { CurrentOrdersTable } from './CurrentOrdersTable/CurrentOrdersTable'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { changeLoadingStatus } from '../../Redux/Slices/LoadingSlice'
import { createError } from '../../Redux/Slices/ErrorsSlice'

const Orders = ({ setError, setIsLoading }) => {
    const [orders, setOrders] = useState([])
    const [orderForModal, setOrderForModal] = useState({})
    const [route, setRoute] = useState({})
    const [startPointData, setStartPointData] = useState({})
    const [finalPointData, setFinalPointData] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOrders = async () => {
            dispatch(changeLoadingStatus(true))
            const response = await api.getOrders()
            dispatch(changeLoadingStatus(false))
            if (response.status.toString()[0] === '4') {
                dispatch(createError(response.data.detail ))
            } else if (response.status === 200) {
                setOrders(response.data)
            }
        }
        fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showModal = async (order) => {
        if (!_.isEqual(order, orderForModal)) {
            dispatch(changeLoadingStatus(true))
            setOrderForModal((prevState) => ({ ...prevState, ...order }))
            await handleRoute(order.source, order.destination)
            dispatch(changeLoadingStatus(false))
        }

        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleRoute = async (source, destination) => {
        const responseRoute = await api.getRoute(source, destination)
        const responseStartPointData = await api.getRoutePoint(source)
        const responseFinalPointData = await api.getRoutePoint(destination)

        setStartPointData((prevState) => ({ ...prevState, ...responseStartPointData.data }))
        setFinalPointData((prevState) => ({ ...prevState, ...responseFinalPointData.data }))
        setRoute((prevState) => ({ ...prevState, ...responseRoute.data }))
    }

    return (
        <div>
            <h2 className={Style.ordersPageTitle}>{orders.length} - available orders at the moment:</h2>
            {orders.length === 0 ? (
                ''
            ) : (
                <div className='orders-list'>
                    {isModalVisible && (
                        <OrderModal
                            routeData={route}
                            isModalVisible={isModalVisible}
                            handleOk={handleOk}
                            handleCancel={handleCancel}
                            startPointData={startPointData}
                            finalPointData={finalPointData}
                            orderData={orderForModal}
                        />
                    )}
                    <CurrentOrdersTable orders={orders} showModal={showModal} />
                </div>
            )}
        </div>
    )
}

export default Orders
