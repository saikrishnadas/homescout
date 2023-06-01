import { useState } from 'react'
import { useDispatch } from "react-redux"
import api from './utils/api'
import { login } from "./features/auth/authSlice"
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const response = await api.post('register/', {
                    username,
                    email,
                    password,
                    phone_number: phone
                })
                console.log(response)
                const { access, refresh } = response?.data
                dispatch(login({ accessToken: access, refreshToken: refresh }))
                localStorage.setItem('authTokens', JSON.stringify(response?.data));
                navigate("/home");
            } catch (error) {
                console.log("Register failed!", error)
            }
        } else {
            console.log("Passwords doesn't match")
        }

    }

    return (
        <>
            <form onSubmit={handleRegister}>
                <input type="text" value={username} placeholder="Enter the username" onChange={(e) => setUsername(e.target.value)} />
                <input type="email" value={email} placeholder="Enter the email" onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={phone} placeholder="Enter the phone numuber" onChange={(e) => setPhone(e.target.value)} />
                <input type="text" value={password} placeholder="Enter the password" onChange={(e) => setPassword(e.target.value)} />
                <input type="text" value={confirmPassword} placeholder="Enter the password again" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type='submit'>Register</button>
            </form>
        </>
    )
}

export default RegisterPage
