import { useDispatch } from "react-redux"
import { logout } from "./features/auth/authSlice"
import { useNavigate } from "react-router-dom";

function HomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <>
            <div>Home Page</div>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default HomePage
