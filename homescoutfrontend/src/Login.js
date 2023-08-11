import { useState, useEffect, useRef } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from './features/auth/authApiSlice';
import { setCredentials } from './features/auth/authSlice';

function LoginPage() {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

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
            navigate('/home')
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
            {isLoading ? <h1>Loading...</h1> : <section className="login">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <form onSubmit={handleLogin}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter the username"
                        ref={userRef}
                        value={user}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter the password"
                        onChange={handlePwdInput}
                        value={pwd}
                        required
                    />
                    <button type='submit'>Login</button>
                </form>
            </section>}
        </>
    )
}

export default LoginPage
