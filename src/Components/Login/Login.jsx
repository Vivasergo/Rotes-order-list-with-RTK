import React, { useState } from 'react'
// import { api } from '../../Service/api'
import { Button, Input } from 'antd'
import style from './Style.module.css'
import { useDispatch } from 'react-redux'
import { doLogin } from "../../Redux/Thunks";

const Login = ({ setIsAuth, setError, setIsLoading }) => {
    const [formData, setFormData] = useState({ username: '', password: '' })

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(doLogin(formData))
    }

    return (
        <div className={style.loginComponent}>
            <h2>Please Login</h2>
            <div>
                <form>
                    <label>
                        {' '}
                        Login:
                        <div>
                            <Input
                                placeholder='Login'
                                onChange={(e) => handleChange(e)}
                                name={'username'}
                                type='text'
                                className={style.authInput}
                            />
                        </div>
                    </label>
                    <label>
                        {' '}
                        Password:
                        <div>
                            <Input
                                placeholder='Password'
                                onChange={(e) => handleChange(e)}
                                name={'password'}
                                type='password'
                                className={style.authInput}
                            />
                        </div>
                    </label>
                    <Button onClick={(e) => handleSubmit(e)} type='primary'>
                        Log in
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login
