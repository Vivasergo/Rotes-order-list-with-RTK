import React from 'react'
import { Button, Table } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import style from './Style.module.css'
import { useSelector } from "react-redux";

export const CurrentOrdersTable = ({ showModal }) => {
    const data = []

    const orders = useSelector((state) => state.orders)

    for (let orderItem of orders) {
        data.push({
            key: uuidv4(),
            orderNr: orderItem.order_number,
            clientsName: orderItem.subject,
            destinationTime: moment(orderItem.destination.time).format('HH:mm DD.MM.YYYY'),
            routeDetails: orderItem,
        })
    }

    const columns = [
        {
            title: 'Order nr',
            dataIndex: 'orderNr',
            key: 'orderNr',
        },
        {
            title: 'Client name',
            dataIndex: 'clientsName',
            key: 'clientsName',
        },
        {
            title: 'Destination time',
            dataIndex: 'destinationTime',
            key: 'destinationTime',
        },
        {
            title: 'Route details',
            dataIndex: 'routeDetails',
            key: 'routeDetails',
            render: (order) => {
                return (
                    <Button type='default' onClick={() => showModal(order)}>
                        Show details
                    </Button>
                )
            },
        },
    ]

    return (
        <div className={style.mainOrdersTable}>
            <Table columns={columns} dataSource={data}/>
        </div>
    )
}
