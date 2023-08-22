import { useState, useEffect, useRef } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from './features/auth/authApiSlice';
import { setCredentials } from './features/auth/authSlice';
import { Spin } from "antd"
import "./Register.css"

function LoginPage() {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const userName = localStorage.getItem("user") ? localStorage.getItem("user") : null
    const token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null

    useEffect(() => {
        if (token && userName) {

            navigate("/")
        }
    }, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ email: user, password: pwd }).unwrap(); //unwrap allows us to use try catch and it will respond accordingly 
            dispatch(setCredentials({ ...userData, user }))
            setUser('')
            setPwd('')
            navigate('/')
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    return (
        <>
            {isLoading ? <h1><Spin size="large" /></h1> : <section className="login">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <div className="register-form">
                    <div className='register-heading'>Secure Your Rental Haven</div>
                    <div className='register-heading-sub'>Log In Now</div>
                    <form onSubmit={handleLogin}>
                        <div className='register-div'>
                            <label htmlFor="username" className="label-register">Username:</label>
                            <input
                                className="input-register"
                                // type="text"
                                id="username"
                                placeholder="Enter the username"
                                ref={userRef}
                                value={user}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            /></div>
                        <div className='register-div'>
                            <label htmlFor="password" className="label-register">Password:</label>
                            <input
                                className="input-register"
                                type="password"
                                id="password"
                                placeholder="Enter the password"
                                onChange={handlePwdInput}
                                value={pwd}
                                required
                            />
                        </div>
                        <button type='submit'>Login</button>
                        <span className="register-message">
                            <p style={{ color: "black", marginRight: "10px" }}>Don't have an account?</p>{" "}
                            <div onClick={() => navigate('/register')}>
                                <p style={{ color: "#2d66f7", textDecoration: "underline", cursor: "pointer" }}>Register</p>
                            </div>
                        </span>
                    </form>
                </div>
            </section>}
        </>
    )
}

export default LoginPage
