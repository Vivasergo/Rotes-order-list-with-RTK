import './App.css'
import Login from './Components/Login/Login'
import Orders from './Components/Orders/Orders'
import { useEffect } from 'react'
import { Logout } from './Components/Logout/Logout'
import { Loading } from './Components/Loading/Loading'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { authorized } from './Redux/Slices/AuthSlice'

function App() {
    // const [isAuth, setIsAuth] = useState(false)
    // const [error, setError] = useState({ isError: false, errorMessage: '' })

    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state.authentication.isAuth)
    const isLoading = useSelector((state) => state.loading.isLoading)
    const { isError, errorMessage } = useSelector((state) => state.error)

    useEffect(() => {
        if (sessionStorage['accessToken']) {
            dispatch(authorized(true))
        }
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            sessionStorage.clear()
            authorized(false)
        }
    }, [isError])

    return (
        <div className='App'>
            <div className='App-bg'></div>
            {isLoading && <Loading />}
            <h1>Welcome to the order route app!</h1>

            {isAuth && (
                <>
                    <Logout />
                    <Orders isAuth={isAuth} />
                </>
            )}
            {!isAuth && <Login />}
            {isError && <div className='error-message'>{errorMessage}</div>}
        </div>
    )
}

export default App
