import React, { useState } from 'react'
import { Modal, Button, Dropdown, Space, Menu } from "antd";
import "./PostPropertyModal.css"
import { useNavigate } from 'react-router-dom';
import {
    GoThreeBars,
    GoSearch,
    GoTriangleDown,
    GoPerson,
} from "react-icons/go";


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


function PostPropertyModal() {
    const naviagte = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [type, setType] = useState("rent")
    const [propertyType, setPropertyType] = useState("")
    const [unit, setUnit] = useState("")
    const [city, setCity] = useState("")

    const items = cities.map((city, index) => ({
        key: (index + 1).toString(),
        label: (
            <div
                onClick={() => setCity(city)}
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


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal open={isModalOpen}
            footer={null}
            header={null}
            onCancel={handleCancel}
            title="Post Property"
        >
            <>
                <div className='sub-title'>Rent your property in simple steps </div>
                <div className='sub-sub-title'>Tell us about your property</div>
                <div className='label'>List property for*</div>
                <div className="option-button-container">
                    <div className={type === "sell" ? "option-button-selected" : "option-button-disabled"}><span>Sell</span></div>
                    <div className={type === "rent" ? "option-button-selected" : "option-button"}><span>Rent</span></div>
                </div>
                <div className='label'>Property Type*</div>
                <div className="option-button-container">
                    <div className={propertyType === "apartment" ? "option-button-selected" : "option-button"} onClick={() => setPropertyType("apartment")}><span>Apartment</span></div>
                    <div className={propertyType === "house" ? "option-button-selected" : "option-button"} onClick={() => setPropertyType("house")}><span>House/Villa</span></div>
                </div>
                <div className='sub-sub-title'>Property Details</div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>City*</div>
                        <Dropdown trigger={["click"]} overlay={menu} placement="bottomLeft">
                            <div
                                className="location-change-menu"
                            >
                                <span
                                    className="location"
                                >
                                    {city}
                                </span>
                                <span>
                                    <GoTriangleDown />
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Location*</div>
                        <input placeholder='location' />
                    </div>
                </div>
                <div className='label'>Unit Type*</div>
                <div className="option-button-container">
                    <div className={unit === "1bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("1bhk")}><span>1BHK</span></div>
                    <div className={unit === "2bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("2bhk")}><span>2BHK</span></div>
                    <div className={unit === "3bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("3bhk")}><span>3BHK</span></div>
                    <div className={unit === "4bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("4bhk")}><span>4BHK</span></div>
                    <div className={unit === "5bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("5bhk")}><span>5BHK</span></div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Build up area*</div>
                        <input placeholder='Build up area' />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Carpet area*</div>
                        <input placeholder='Carpet area' />
                    </div>
                </div>
                <div className='sub-sub-title'>Property Price</div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Rent*</div>
                        <input placeholder='Rent' />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Deposit*</div>
                        <input placeholder='Deposit' />
                    </div>
                </div>
                <div className='sub-sub-title'>More information of your property </div>
                <div className='label'>Property Description*</div>
                <input placeholder='Property Description' />
                <div className='label'>Unit Type*</div>
                <div className="option-button-container">
                    <div className={unit === "1bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("1bhk")}><span>1BHK</span></div>
                    <div className={unit === "2bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("2bhk")}><span>2BHK</span></div>
                    <div className={unit === "3bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("3bhk")}><span>3BHK</span></div>
                    <div className={unit === "4bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("4bhk")}><span>4BHK</span></div>
                    <div className={unit === "5bhk" ? "option-button-selected" : "option-button"} onClick={() => setUnit("5bhk")}><span>5BHK</span></div>
                </div>
            </>
        </Modal>
    )
}

export default PostPropertyModal
