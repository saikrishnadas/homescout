import { useState, useRef, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from './features/auth/authApiSlice';

function RegisterPage() {

    const userRef = useRef();
    const errRef = useRef();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [user, setUser] = useState('')
    const [phone, setPhone] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, confirmPwd, phone, firstName, lastName])

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (confirmPwd !== pwd) {
                setErrMsg('Password doesnt match');
                return
            } else {
                await register({ firstName: firstName, lastName: lastName, email: user, password: pwd, phoneNumber: phone }).unwrap(); //unwrap allows us to use try catch and it will respond accordingly 
                setUser('')
                setPwd('')
                setConfirmPwd('')
                setFirstName('')
                setLastName('')
                setPhone('')
                navigate('/login')
            }

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

    const handleFirstInput = (e) => setFirstName(e.target.value)
    const handleLastInput = (e) => setLastName(e.target.value)

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)
    const handleConfirmPwdInput = (e) => setConfirmPwd(e.target.value)

    const handlePhoneInput = (e) => setPhone(e.target.value)


    return (
        <>
            {isLoading ? <h1>Loading...</h1> : <section className="register">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                <form onSubmit={handleRegister}>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter the first name"
                        ref={userRef}
                        value={firstName}
                        onChange={handleFirstInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter the last name"
                        value={lastName}
                        onChange={handleLastInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Enter the email"
                        value={user}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Enter the phone number"
                        onChange={handlePhoneInput}
                        value={phone}
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

                    <label htmlFor="password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Re-enter the password"
                        onChange={handleConfirmPwdInput}
                        value={confirmPwd}
                        required
                    />
                    <button type='submit'>Register</button>
                </form>
            </section>}
        </>
    )
}

export default RegisterPage
