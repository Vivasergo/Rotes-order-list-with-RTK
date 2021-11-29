import './App.css'
import Login from './Components/Login/Login'
import Orders from './Components/Orders/Orders'
import { useEffect, useState } from 'react'
import { Logout } from './Components/Logout/Logout'
import { Loading } from './Components/Loading/Loading'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { authorized } from './Redux/Slices/AuthSlice'

function App() {
    // const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState({ isError: false, errorMessage: '' })
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.authentication.isAuth)

    useEffect(() => {
        if (sessionStorage['accessToken']) {
            dispatch(authorized(true))
        }
    }, [dispatch])

    useEffect(() => {
        if (error.isError) {
            sessionStorage.clear()
            authorized(false)
        }
    }, [error.isError])

    return (
        <div className='App'>
            <div className='App-bg'></div>
            {isLoading && <Loading />}
            <h1>Welcome to the order route app!</h1>

            {isAuth && (
                <>
                    <Logout />
                    <Orders setError={setError} setIsLoading={setIsLoading} isAuth={isAuth} />
                </>
            )}
            {!isAuth && <Login setError={setError} setIsLoading={setIsLoading} />}
            {error.isError && <div className='error-message'>{error.errorMessage}</div>}
        </div>
    )
}

export default App
