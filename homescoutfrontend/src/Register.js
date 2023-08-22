import { useState, useRef, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from './features/auth/authApiSlice';
import "./Register.css"

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
                <div className="register-form">
                    <div className='register-heading'>Seamless Rental Experience Awaits</div>
                    <div className='register-heading-sub'>Register for Rentals Now</div>
                    <form onSubmit={handleRegister}>
                        <div className='register-div'>
                            <label htmlFor="firstName" className="label-register">First Name:</label>
                            <input
                                className="input-register"
                                // type="text"
                                id="firstName"
                                placeholder="Enter the first name"
                                ref={userRef}
                                value={firstName}
                                onChange={handleFirstInput}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className='register-div'>
                            <label htmlFor="lastName" className="label-register">Last Name:</label>
                            <input
                                className="input-register"
                                // type="text"
                                id="lastName"
                                placeholder="Enter the last name"
                                value={lastName}
                                onChange={handleLastInput}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className='register-div'>
                            <label htmlFor="email" className="label-register">Email:</label>
                            <input
                                className="input-register"
                                // type="text"
                                id="email"
                                placeholder="Enter the email"
                                value={user}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className='register-div'>
                            <label htmlFor="phone" className="label-register">Phone:</label>
                            <input
                                className="input-register"
                                // type="text"
                                id="phone"
                                placeholder="Enter the phone number"
                                onChange={handlePhoneInput}
                                value={phone}
                                required
                            />
                        </div>
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
                        <div className='register-div'>

                            <label htmlFor="password" className="label-register">Confirm Password:</label>
                            <input
                                className="input-register"
                                type="password"
                                id="confirmPassword"
                                placeholder="Re-enter the password"
                                onChange={handleConfirmPwdInput}
                                value={confirmPwd}
                                required
                            />
                        </div>
                        <button type='submit'>Register</button>
                        <span className="register-message">
                            <p style={{ color: "black", marginRight: "10px" }}>Do you have an account?</p>{" "}
                            <div onClick={() => navigate('/login')}>
                                <p style={{ color: "#2d66f7", textDecoration: "underline", cursor: "pointer" }}>Login</p>
                            </div>
                        </span>
                    </form>
                </div>
            </section>}
        </>
    )
}

export default RegisterPage
