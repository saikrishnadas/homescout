import { useState } from 'react'
import { useDispatch } from "react-redux"
import api from './utils/api'
import { login } from "./features/auth/authSlice"
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('login/', {
                username,
                password,
            })
            const { access_token, refresh_token } = response.data
            dispatch(login({ accessToken: access_token, refreshToken: refresh_token }))
            navigate("/home");
        } catch (error) {
            console.log("Login failed!", error)
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input type="text" value={username} placeholder="Enter the username" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" value={password} placeholder="Enter the password" onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default LoginPage
