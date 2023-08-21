import {
    GoThreeBars,
    GoSearch,
    GoTriangleDown,
    GoPerson,
} from "react-icons/go";
import "./Navbar.css";
import { Button, Dropdown, Space, Menu } from "antd";
import { useEffect, useState } from "react"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import CityModal from "./CityModal";
import PostPropertyModal from "./PostPropertyModal";
import { useDispatch, useSelector } from "react-redux"
import { setIsOpen } from './features/postPropertySlice';
import { logOut, selectCurrentUser } from "./features/auth/authSlice";
import { setIsOpenUpdate } from "./features/updatePropertySlice";
import { setProperties, useLazyGetPropertiesByUserQuery, useGetPropertyQuery, useGetUserInfoQuery, useGetCityFilterQuery, useGetPropertiesWithTitleQuery } from "./features/propertiesSlice";
import { setPropertyCount } from "./features/countSlice";
import {
    GiFamilyHouse
} from "react-icons/gi";






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

const profile = [
    "Logout",
    "View Listings"
]




function Navbar() {
    const naviagte = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryCity = queryParams.get('city');
    const queryTitle = queryParams.get('title');
    const [search, setSearch] = useState("")
    const { id } = useParams()

    const dispatch = useDispatch();
    // const user = useSelector(selectCurrentUser)
    const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;
    const { data: userInfo } = useGetUserInfoQuery(user);
    const { data: property } = useGetPropertyQuery(id, { skip: id === undefined });
    const [getPropertiesByUser, { data: propertiesByUser }] = useLazyGetPropertiesByUserQuery();
    const { data: filteredProperty } = useGetCityFilterQuery(queryCity, { skip: queryCity === null });
    const { data: filteredPropertyWithTitle } = useGetPropertiesWithTitleQuery({ queryCity, queryTitle }, { skip: queryTitle === null })

    if (queryCity) {
        if (filteredProperty) {
            dispatch(setProperties(filteredProperty));
        }
    }

    if (queryTitle) {
        if (filteredPropertyWithTitle) {
            dispatch(setProperties(filteredPropertyWithTitle));
        }
    }

    const handleListing = async (k) => {
        if (k.split(" ")[1] === "Listings") {
            await getPropertiesByUser(userInfo?._id);
            if (propertiesByUser) {
                dispatch(setPropertyCount(propertiesByUser?.length));
                dispatch(setProperties(propertiesByUser))
            }
        }

        if (k === "Logout") {
            handleLogout();
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            naviagte("/properties")
        }
    }


    const items = cities.map((city, index) => ({
        key: (index + 1).toString(),
        label: (
            <div
                onClick={() => handleCityFilter(city)}
            >
                {city}
            </div>
        ),
    }));

    const profileItems = profile.map((k, index) => ({
        key: (index + 1).toString(),
        label: (
            <div onClick={() => handleListing(k)}>
                {k}
            </div>
        ),
    }));

    const profileMenu = (
        <Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {profileItems.map((item) => (
                <Menu.Item key={item.key} >
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    const menu = (
        <Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {items.map((item) => (
                <Menu.Item key={item.key} >
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );



    const handleCityFilter = async (city) => {
        naviagte(`?city=${city}`)
    }


    const handleSearch = async () => {
        let queryString = ''
        if (queryCity) {
            queryString += `?city=${queryCity}`;
            if (search.length > 0) {
                queryString += `&title=${search}`;
            }
        } else if (search.length > 0) {
            queryString += `?title=${search}`;
        }
        naviagte(queryString)
    }

    const handleLogout = () => {
        dispatch(logOut())
        naviagte("/login")
    }

    return (
        <div
            className="navbar-container"
        >
            <CityModal />
            <PostPropertyModal />
            <div className="navbar-left" onClick={() => naviagte("/properties")}>
                <div className="company-logo-logo">
                    <GiFamilyHouse style={{ color: "white", fontSize: "30px" }} />
                </div>
                <div className="company-logo">HOMESCOUT</div>
            </div >
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
                <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    {user ? <> <Dropdown trigger={["click"]} overlay={profileMenu} placement="bottomLeft">
                        <div>
                            <GoPerson style={{ color: "white", fontSize: "24px" }} />
                        </div>
                    </Dropdown></> : <div
                        className="post-property-botton"
                        onClick={() => naviagte('/login')}
                    >
                        <span
                            className="post-property-botton-text"
                        >
                            LOGIN
                        </span>
                    </div>}
                    {!user && <div
                        className="post-property-botton"
                        onClick={() => naviagte('/register')}
                    >
                        <span
                            className="post-property-botton-text"
                        >
                            REGISTER
                        </span>
                    </div>}

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
                    {user && id && userInfo?._id === property.listedBy && < div
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
        </div >
    );
}

export default Navbar;
