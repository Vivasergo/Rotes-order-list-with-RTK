import React from 'react'
import imgSrc from './Images/loading.gif'
import Style from './Style.module.css'

export const Loading = () => {
    return (
        <div className={Style.loadingComponent}>
            <img src={imgSrc} alt='Loading spinner' />
        </div>
    )
}
