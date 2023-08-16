import {
    GoThreeBars,
    GoSearch,
    GoTriangleDown,
    GoPerson,
} from "react-icons/go";
import "./Navbar.css";
import { Button, Dropdown, Space, Menu } from "antd";
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CityModal from "./CityModal";
import PostPropertyModal from "./PostPropertyModal";
import { useDispatch, useSelector } from "react-redux"
import { setIsOpen } from './features/postPropertySlice';
import { selectCurrentUser } from "./features/auth/authSlice";
import { setIsOpenUpdate } from "./features/updatePropertySlice";





const cities = [
    "Agra",
    "Ahmedabad",
    "Aurangabad",
    "Bangalore",
    "Bhopal",
    "Chennai",
    "Delhi",
    "Faridabad",
    "Ghaziabad",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kanpur",
    "Kochi",
    "Kolkata",
    "Ludhiana",
    "Lucknow",
    "Meerut",
    "Mumbai",
    "Nagpur",
    "Nashik",
    "Patna",
    "Pune",
    "Rajkot",
    "Srinagar",
    "Surat",
    "Thane",
    "Varanasi",
    "Vadodara",
    "Visakhapatnam"
]




function Navbar() {
    const naviagte = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryCity = queryParams.get('city');
    const [search, setSearch] = useState("")
    const { id } = useParams();

    const dispatch = useDispatch()
    // const user = useSelector(selectCurrentUser)
    const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;


    const items = cities.map((city, index) => ({
        key: (index + 1).toString(),
        label: (
            <div
                onClick={() => naviagte(`?city=${city}`)}
            >
                {city}
            </div>
        ),
    }));

    const menu = (
        <Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {items.map((item) => (
                <Menu.Item key={item.key} >
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    const handleSearch = () => {
        naviagte(`?city=${queryCity}&title=${search}`)
    }

    return (
        <div
            className="navbar-container"
        >
            <CityModal />
            <PostPropertyModal />
            <div className="navbar-left">
                <div>
                    <GoThreeBars style={{ color: "white", fontSize: "30px" }} />
                </div>
                <div className="company-logo">LOGO</div>
            </div>
            <div>
                <div className="search-container">
                    <Dropdown trigger={["click"]} overlay={menu} placement="bottomLeft">
                        <div
                            className="location-change-menu"
                        >
                            <span
                                className="location"
                            >
                                {queryCity}
                            </span>
                            <span>
                                <GoTriangleDown />
                            </span>
                        </div>
                    </Dropdown>
                    <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                    <button className="search-submit-button" onClick={handleSearch}>
                        <GoSearch style={{ color: "white", fontSize: "18px" }} />
                    </button>
                </div>
            </div>
            <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div>
                        <GoPerson style={{ color: "white", fontSize: "24px" }} />
                    </div>
                    {user && <div
                        className="post-property-botton"
                        onClick={() => dispatch(setIsOpen(true))}
                    >
                        <span
                            className="post-property-botton-text"
                        >
                            POST PROPERTY
                        </span>
                    </div>}
                    {user && id && <div
                        className="post-property-botton"
                        onClick={() => dispatch(setIsOpenUpdate(true))}
                    >
                        <span
                            className="post-property-botton-text"
                        >
                            UPDATE PROPERTY
                        </span>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
