import React, { useState } from 'react'
import { Modal, Button, Dropdown, Space, Menu, Input } from "antd";
import "./PostPropertyModal.css"
import { useNavigate } from 'react-router-dom';
import {
    GoThreeBars,
    GoSearch,
    GoTriangleDown,
    GoPerson,
} from "react-icons/go";
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpen } from './features/postPropertySlice';
import { useMutation } from "react-query"
import axios from 'axios';


const { TextArea } = Input


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
    const isModalOpen = useSelector((state) => state.postProperty.isOpen)
    // const [isModalOpen, setIsModalOpen] = useState(true);
    const [type, setType] = useState("rent")
    const [propertyType, setPropertyType] = useState("")
    const [unit, setUnit] = useState("")
    const [city, setCity] = useState("")
    const [location, setLocation] = useState("")
    const [builduparea, setBuilduparea] = useState("")
    const [carpetarea, setCarpetarea] = useState("")
    const [rent, setRent] = useState("")
    const [deposit, setDeposit] = useState("")
    const [desc, setDesc] = useState("")
    const [bath, setBath] = useState("")

    const dispatch = useDispatch()

    const addProperty = (data) => {
        return axios.post(`http://127.0.0.1:8000/api/properties/create/`, data)
    }

    const { mutate: addProp } = useMutation(addProperty)




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
        dispatch(setIsOpen(true))
    };

    const handleOk = () => {
        const data = {
            type: type,
            propertyType: propertyType,
            city: city,
            location: location,
            unit: unit,
            builduparea: builduparea,
            carpetarea: carpetarea,
            rent: rent,
            deposit: deposit,
            desc: desc,
            bath: bath
        }
        console.log(data)
        addProp(data)
        dispatch(setIsOpen(false))
    };

    const handleCancel = () => {
        dispatch(setIsOpen(false))
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
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} placeholder='Enter the location' onChange={(e) => setLocation(e.target.value)} />
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
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} placeholder='Enter build up area' onChange={(e) => setBuilduparea(e.target.value)} />

                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Carpet area*</div>
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} placeholder='Enter carpet area' onChange={(e) => setCarpetarea(e.target.value)} />
                    </div>
                </div>
                <div className='sub-sub-title'>Property Price</div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Rent*</div>
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} placeholder='Enter the rent' onChange={(e) => setRent(e.target.value)} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Deposit*</div>
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} placeholder='Enter the deposit' onChange={(e) => setDeposit(e.target.value)} />
                    </div>
                </div>
                <div className='sub-sub-title'>More information of your property </div>
                <div className='label'>Property Description*</div>
                <TextArea style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} placeholder='Enter property description' onChange={(e) => setDesc(e.target.value)} />
                <div className='label'>No of Bathrooms*</div>
                <div className="option-button-container">
                    <div className={bath === "1bath" ? "option-button-selected" : "option-button"} onClick={() => setBath("1bath")}><span>1BATH</span></div>
                    <div className={bath === "2bath" ? "option-button-selected" : "option-button"} onClick={() => setBath("2bath")}><span>2BATH</span></div>
                    <div className={bath === "3bath" ? "option-button-selected" : "option-button"} onClick={() => setBath("3bath")}><span>3BATH</span></div>
                    <div className={bath === "4bath" ? "option-button-selected" : "option-button"} onClick={() => setBath("4bath")}><span>4BATH</span></div>
                    <div className={bath === "5bath" ? "option-button-selected" : "option-button"} onClick={() => setBath("5bath")}><span>5BATH</span></div>
                </div>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "end" }}><div
                    className="post-property-botton"
                    onClick={handleOk}
                >
                    <span
                        className="post-property-botton-text"
                    >
                        POST PROPERTY
                    </span>
                </div></div>

            </>
        </Modal>
    )
}

export default PostPropertyModal
