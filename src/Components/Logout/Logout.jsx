import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { doLogout } from '../../Redux/Shared/ActionCreators'

export const Logout = ({ setIsAuth }) => {
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        console.log('Logout call handleLogout')
        dispatch(doLogout())
        // sessionStorage.clear()
        // setIsAuth(false)
    }

    return (
        <div>
            <Button type='primary' onClick={handleLogout}>
                Logout
            </Button>
        </div>
    )
}
