import React, { useEffect } from 'react'
import { Modal } from 'antd'
import style from './Style.module.css'
import endPinSrc from './Images/Location-512.png'
import L from 'leaflet'
import { DestinationPointTable } from '../RoutePointsTable/DestinationPointTable'
import moment from 'moment'
import { StartPointTable } from '../RoutePointsTable/StartPointTable'
import { useSelector } from "react-redux";

export const OrderModal = ({
    isModalVisible,
    handleOk,
    handleCancel,
}) => {

    const route = useSelector((state) => state.modalData.route)
    const orderData = useSelector(state => state.modalData.orderForModal)
    const startPointData = useSelector(state => state.modalData.startPointData)
    const finalPointData = useSelector(state => state.modalData.finalPointData)

    const [[startLon, startLat], [endLon, endLat]] = route.metadata.query.coordinates

    useEffect(() => {

        const myMap = L.map('map')
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
            foo: 'bar',
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(myMap)

        const center = new L.LatLng(startLat, startLon)
        myMap.setView(center, 7.5)

        const endPinIcon = L.icon({
            iconUrl: endPinSrc,
            iconSize: [25, 40],
            iconAnchor: [12, 40],
        })

        L.marker([startLat, startLon], { title: `Start point: ${startPointData.display_name}` }).addTo(myMap)
        L.marker([endLat, endLon], {
            icon: endPinIcon,
            title: `Final destination: ${finalPointData.display_name}`,
        }).addTo(myMap)

        const featureLayer = L.geoJson(route, {})

        myMap.addLayer(featureLayer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Modal
                bodyStyle={{ height: '80vh', overflowX: 'auto' }}
                title={`Route map. 
                        Order number: ${orderData.order_number}, 
                        Name: ${orderData.subject},
                        Destination time: ${moment(orderData.destination.time).format('HH:mm DD.MM.YYYY')}`}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                className={style.modalContainer}>
                <div className={style.mapBlock} id='map'></div>
                <div className={style.routeTableData}>
                    <StartPointTable pointData={startPointData} />
                    <DestinationPointTable pointData={finalPointData} />
                </div>
            </Modal>
        </>
    )
}
