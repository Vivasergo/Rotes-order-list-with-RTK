import React, { useEffect, useState } from 'react'
import Style from './style.module.css'
import { OrderModal } from '../Modal/OrderModal'
import { CurrentOrdersTable } from './CurrentOrdersTable/CurrentOrdersTable'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getModalOrderData, getOrders } from "../../Redux/Thunks/";

const Orders = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const orders = useSelector((state) => state.orders)
    const orderForModal = useSelector(state => state.modalData.orderForModal)
    const { isError } = useSelector((state) => state.error)

    useEffect(() => {
        console.log('!isError', !isError)
        console.log('!!orderForModal.id', !!orderForModal.id)
        console.log('orderForModal', orderForModal)

        if (!isError && !!orderForModal.id) {
            setIsModalVisible(true)
        }
    }, [isError, orderForModal.id])

    const showModal = async (order) => {

        if (!_.isEqual(order, orderForModal)) {
            await dispatch(getModalOrderData(order))
        }

        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
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
                            isModalVisible={isModalVisible}
                            handleOk={handleOk}
                            handleCancel={handleCancel}
                        />
                    )}
                    <CurrentOrdersTable showModal={showModal}/>
                </div>
            )}
        </div>
    )
}

export default Orders
