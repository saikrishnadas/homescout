import {
    GoThreeBars,
    GoSearch,
    GoTriangleDown,
    GoPerson,
} from "react-icons/go";
import "./Navbar.css";
import { Button, Dropdown, Space, Menu } from "antd";
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import CityModal from "./CityModal";
import PostPropertyModal from "./PostPropertyModal";



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
                    <div
                        className="post-property-botton"
                    >
                        <span
                            className="post-property-botton-text"
                        >
                            POST PROPERTY
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
