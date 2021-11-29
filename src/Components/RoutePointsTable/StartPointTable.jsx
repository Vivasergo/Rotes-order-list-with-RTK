import React from 'react'
import { PointDataTable } from './PointDataTable/PointDataTable'
import style from './Style.module.css'

export const StartPointTable = ({ pointData }) => {
    return (
        <div className={style.pointTable}>
            <h3>Start point:</h3>
            <PointDataTable pointData={pointData} />
        </div>
    )
}
