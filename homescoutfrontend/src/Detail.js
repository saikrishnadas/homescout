import React, { useState } from 'react'
import Navbar from "./Navbar"
import "./Detail.css"
import { Checkbox, Spin } from 'antd';
import {
    GoPerson,
} from "react-icons/go";
import { useQuery } from "react-query"
import axios from 'axios';
import { useParams } from "react-router-dom"
import moment from 'moment'
import { useGetContactMutation, useGetPropertyQuery, useGetUserInfoQuery, useUpdatePropertyMutation } from './features/propertiesSlice';
import UpdatePropertyModal from './UpdatePropertyModal';
import { useEffect } from 'react';
import BuildingImage from "./images/bImage.jpeg"

function Detail() {
    const { id } = useParams();
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [allowContact, setAllowContact] = useState(false);
    const [painting, setPainting] = useState(false);
    const [design, setDesign] = useState(false);

    const { data, isLoading, isError, error } = useGetPropertyQuery(id, { skip: id === undefined });
    const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;
    const { data: userInfo } = useGetUserInfoQuery(user);
    const [getContact, { data: contactDetails, isSuccess }] = useGetContactMutation()

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    if (isLoading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItem: "center" }}><Spin size="large" /></div>
    }


    if (isError) {
        return <div>{error.message}</div>
    }

    const handleContact = async () => {
        const contactData = {
            fullName,
            email,
            phoneNumber,
            allowContact,
            painting,
            design
        }
        await getContact(contactData)
        if (isSuccess) {
            setFullName(null)
            setEmail(null)
            setAllowContact(false)
            setPainting(false)
            setDesign(false)
        }
    }



    return (
        <div>
            <Navbar />
            <UpdatePropertyModal data={data} />

            <div className='detail-container'>
                {/* Parent DIV */}
                <div >
                    <div className='overview-container'>
                        {/* Details */}
                        <div className='overview-image'>
                            {/* Image */}
                            <img className='overview-image-image' src={BuildingImage} />
                        </div>
                        <div className='overview-right-detail'>
                            {/* Right Detail */}
                            <div className='overview-title'>
                                {/* Title */}
                                <span style={{ fontWeight: "bold", fontSize: "22px" }}>{data?.title}</span>
                                <span>in <span style={{ fontWeight: "bold", fontSize: "22px", color: "#37a5a9", cursor: "pointer" }}>{data?.city}</span></span>
                            </div>
                            <div className='overview-sqft'>
                                {/* Sq ft area */}
                                <span style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "20px" }}>₹{data?.rent}</span>
                                <div className='overview-area-wrap'>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Super Built-Up Area</span><span style={{ fontWeight: "bold" }}>{data?.buildUpArea} Sq.Ft</span></div>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Carpet Area</span><span style={{ fontWeight: "bold" }}>{data?.carpetArea} Sq.Ft</span></div>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Bedrooms</span><span style={{ fontWeight: "bold" }}>{data?.bedrooms}</span></div>
                                </div>
                                <div className='overview-area-wrap-inner' style={{ marginLeft: "8%", }}><span style={{ color: "grey" }}>Bathroom</span><span style={{ fontWeight: "bold" }}>{data?.bathrooms}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='features'>
                        <span className='features-main-title'>OVERVIEW</span>
                        <div className='features-items'>
                            <div className='feature-item'><span className='feature-item-title'>Type</span><span>{capitalizeFirstLetter(data?.propertyType)}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Parking</span><span>{data?.parking ? "Yes" : "No"}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Furnishing State</span><span>Semi Furnished</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Listed by</span><span>{data?.listedBy ? data?.listedBy === userInfo?._id && userInfo?.firstName + " " + userInfo?.lastName : ""}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Property on</span><span>Ground Floor</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Listed on</span><span>{moment(data?.listedOn).format('DD-MMM')}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Security Deposit</span><span>{data?.securityDeposit}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Pet Allowed</span><span>{data?.petAllowed ? "Yes" : "No"}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Non Vegetarian</span><span>{data?.nonVegetarian ? "Yes" : "No"}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Brokerage terms</span><span>No</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Bachelors Allowed</span><span>{data?.bachelorsAllowed ? "Yes" : "No"}</span></div>

                        </div>
                    </div>
                    <div className='description-container'>
                        <span className='description-title'>Property Description</span>
                        <div style={{ marginTop: "20px" }}>{data?.propertyDescription}</div>
                    </div>
                </div>
                <div >
                    <div className='user-form' style={{ border: "3px solid #37a5a9", paddingTop: "10px" }}>
                        <div className='profile-container'>
                            <div>
                                <GoPerson style={{ color: "black", fontSize: "34px" }} />
                            </div>
                            <div>
                                {data?.listed_by}
                            </div>
                        </div>
                        <div className='form-under'>
                            <span style={{ fontSize: "18px" }}>View Contact Details</span>
                            <div className='user-details'>
                                <input placeholder='Name' style={{ height: "30px", width: "60%" }} value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                                <input placeholder='Email' style={{ height: "30px", width: "60%" }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <input placeholder='Phone Number' style={{ height: "30px", width: "60%" }} value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                            </div>
                            <div>
                                <Checkbox value={allowContact} onChange={(e) => { setAllowContact(e.target.checked) }}>Allow other agents to contact me</Checkbox>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <span>I am looking for</span>
                                <Checkbox value={painting} onChange={(e) => { setPainting(e.target.checked) }}>Painting Service</Checkbox>
                                <Checkbox value={design} onChange={(e) => { setDesign(e.target.checked) }}>Interior Design Service</Checkbox>
                            </div>
                            <div
                                className="post-property-botton"
                                style={{ backgroundColor: "orange" }}
                                onClick={handleContact}
                            >
                                <span
                                    className="post-property-botton-text"
                                >
                                    VIEW CONTACT
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
