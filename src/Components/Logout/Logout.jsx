import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { doLogout } from '../../Redux/Shared/ActionCreators'

export const Logout = () => {
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(doLogout())
    }

    return (
        <div>
            <Button type='primary' onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}
