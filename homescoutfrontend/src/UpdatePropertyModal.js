import React, { useState } from 'react'
import { Modal, Button, Dropdown, Space, Menu, Input } from "antd";
import "./PostPropertyModal.css"
import { useNavigate, useParams } from 'react-router-dom';
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
import { useUpdatePropertyMutation } from './features/propertiesSlice';
import { useEffect } from 'react';


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


function UpdatePropertyModal({ data }) {
    const naviagte = useNavigate()
    // const isModalOpen = useSelector((state) => state.postProperty.isOpen)
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [type, setType] = useState("rent")
    const [title, setTitle] = useState(data?.title)
    const [propertyType, setPropertyType] = useState(data?.propertyType)
    const [unit, setUnit] = useState(data?.bedrooms)
    const [city, setCity] = useState(data?.city)
    const [location, setLocation] = useState(data?.location)
    const [builduparea, setBuilduparea] = useState(data?.buildUpArea)
    const [carpetarea, setCarpetarea] = useState(data?.carpetArea)
    const [rent, setRent] = useState(data?.rent)
    const [deposit, setDeposit] = useState(data?.securityDeposit)
    const [desc, setDesc] = useState(data?.propertyDescription)
    const [bath, setBath] = useState(data?.bathrooms)

    const { id } = useParams();

    const dispatch = useDispatch()

    const [updateProperty, { isLoading, isError, updateError }] = useUpdatePropertyMutation(id, data);

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

    const handleOk = async () => {
        try {
            console.log(title)
            const updatedData = {
                type: type,
                title: title,
                buildUpArea: builduparea,
                carpetArea: carpetarea,
                propertyType: propertyType,
                city: city,
                location: location,
                bedrooms: unit,
                rent: rent,
                securityDeposit: deposit,
                propertyDescription: desc,
                bathrooms: bath
            }
            console.log(updatedData)
            const response = await updateProperty(id, updatedData);
            console.log(response)
            dispatch(setIsOpen(false))
        } catch (error) {
            console.log(error?.message)
            console.log(updateError)
        }
    };

    const handleCancel = () => {
        dispatch(setIsOpen(false))
    };

    return (
        <Modal open={isModalOpen}
            footer={null}
            header={null}
            onCancel={handleCancel}
            title="Update Property"
        >
            <>
                <div className='sub-title'>Rent your property in simple steps </div>
                <div className='sub-sub-title'>Tell us about your property</div>
                <div className='label'>List property for*</div>
                <div className="option-button-container">
                    <div className={type === "sell" ? "option-button-selected" : "option-button-disabled"}><span>Sell</span></div>
                    <div className={type === "rent" ? "option-button-selected" : "option-button"}><span>Rent</span></div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className='label'>Title*</div>
                    <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} placeholder='Enter the title' value={title} onChange={(e) => setTitle(e.target.value)} />
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
                    <div className={unit === 1 ? "option-button-selected" : "option-button"} onClick={() => setUnit(1)}><span>1BHK</span></div>
                    <div className={unit === 2 ? "option-button-selected" : "option-button"} onClick={() => setUnit(2)}><span>2BHK</span></div>
                    <div className={unit === 3 ? "option-button-selected" : "option-button"} onClick={() => setUnit(3)}><span>3BHK</span></div>
                    <div className={unit === 4 ? "option-button-selected" : "option-button"} onClick={() => setUnit(4)}><span>4BHK</span></div>
                    <div className={unit === 5 ? "option-button-selected" : "option-button"} onClick={() => setUnit(5)}><span>5BHK</span></div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Build up area*</div>
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} value={builduparea} placeholder='Enter build up area' onChange={(e) => setBuilduparea(e.target.value)} />

                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Carpet area*</div>
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} value={carpetarea} placeholder='Enter carpet area' onChange={(e) => setCarpetarea(e.target.value)} />
                    </div>
                </div>
                <div className='sub-sub-title'>Property Price</div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Rent*</div>
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} value={rent} placeholder='Enter the rent' onChange={(e) => setRent(e.target.value)} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className='label'>Deposit*</div>
                        <Input style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} value={deposit} placeholder='Enter the deposit' onChange={(e) => setDeposit(e.target.value)} />
                    </div>
                </div>
                <div className='sub-sub-title'>More information of your property </div>
                <div className='label'>Property Description*</div>
                <TextArea style={{ width: "100%", height: "40px", border: "1px solid #37a5a9", borderRadius: "4px" }} value={desc} placeholder='Enter property description' onChange={(e) => setDesc(e.target.value)} />
                <div className='label'>No of Bathrooms*</div>
                <div className="option-button-container">
                    <div className={bath === 1 ? "option-button-selected" : "option-button"} onClick={() => setBath(1)}><span>1BATH</span></div>
                    <div className={bath === 2 ? "option-button-selected" : "option-button"} onClick={() => setBath(2)}><span>2BATH</span></div>
                    <div className={bath === 3 ? "option-button-selected" : "option-button"} onClick={() => setBath(3)}><span>3BATH</span></div>
                    <div className={bath === 4 ? "option-button-selected" : "option-button"} onClick={() => setBath(4)}><span>4BATH</span></div>
                    <div className={bath === 5 ? "option-button-selected" : "option-button"} onClick={() => setBath(5)}><span>5BATH</span></div>
                </div>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "end" }}><div
                    className="post-property-botton"
                    onClick={handleOk}
                >
                    <span
                        className="post-property-botton-text"
                    >
                        UPDATE PROPERTY
                    </span>
                </div></div>

            </>
        </Modal>
    )
}

export default UpdatePropertyModal
