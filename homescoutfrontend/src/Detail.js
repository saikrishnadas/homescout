import React from 'react'
import Navbar from "./Navbar"
import "./Detail.css"
import { Checkbox } from 'antd';
import {
    GoPerson,
} from "react-icons/go";
import { useQuery } from "react-query"
import axios from 'axios';
import { useParams } from "react-router-dom"
import moment from 'moment'

function Detail() {
    const { id } = useParams();

    const fetchProperty = () => {
        return axios.get(`http://127.0.0.1:8000/api/properties/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const { isLoading, data, isError, error } = useQuery("property", fetchProperty)

    if (isLoading) {
        return <div>Loading...</div>
    }


    if (isError) {
        return <div>{error.message}</div>
    }

    console.log(data)

    return (
        <div>
            <Navbar />
            <div className='detail-container'>
                {/* Parent DIV */}
                <div >
                    <div className='overview-container'>
                        {/* Details */}
                        <div className='overview-image'>
                            {/* Image */}
                        </div>
                        <div className='overview-right-detail'>
                            {/* Right Detail */}
                            <div className='overview-title'>
                                {/* Title */}
                                <span style={{ fontWeight: "bold", fontSize: "22px" }}>{data?.data?.title}</span>
                                <span>in <span style={{ fontWeight: "bold", fontSize: "22px", color: "#37a5a9", cursor: "pointer" }}>{data?.data?.city}</span></span>
                            </div>
                            <div className='overview-sqft'>
                                {/* Sq ft area */}
                                <span style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "20px" }}>₹{data?.data?.rent}</span>
                                <div className='overview-area-wrap'>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Super Built-Up Area</span><span style={{ fontWeight: "bold" }}>{data?.data?.build_up_area} Sq.Ft</span></div>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Carpet Area</span><span style={{ fontWeight: "bold" }}>{data?.data?.carpet_area} Sq.Ft</span></div>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Bedrooms</span><span style={{ fontWeight: "bold" }}>{data?.data?.bedrooms}</span></div>
                                </div>
                                <div className='overview-area-wrap-inner' style={{ marginLeft: "8%", }}><span style={{ color: "grey" }}>Bathroom</span><span style={{ fontWeight: "bold" }}>{data?.data?.bathrooms}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='features'>
                        <span className='features-main-title'>OVERVIEW</span>
                        <div className='features-items'>
                            <div className='feature-item'><span className='feature-item-title'>Parking</span><span>{data?.data?.parking ? "Yes" : "No"}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Furnishing State</span><span>Semi Furnished</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Listed by</span><span>{data?.data?.listed_by}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Property on</span><span>Ground Floor</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Listed on</span><span>{moment(data?.data?.listed_on).format('DD-MMM')}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Security Deposit</span><span>{data?.data?.security_deposit}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Pet Allowed</span><span>{data?.data?.pet_allowed ? "Yes" : "No"}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Non Vegetarian</span><span>{data?.data?.non_vegetarian ? "Yes" : "No"}</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Brokerage terms</span><span>No</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Bachelors Allowed</span><span>{data?.data?.bachelors_allowed ? "Yes" : "No"}</span></div>
                        </div>
                    </div>
                    <div className='description-container'>
                        <span className='description-title'>Property Description</span>
                        <div style={{ marginTop: "20px" }}>{data?.data?.property_description}</div>
                    </div>
                </div>
                <div >
                    <div className='user-form' style={{ border: "3px solid #37a5a9", paddingTop: "10px" }}>
                        <div className='profile-container'>
                            <div>
                                <GoPerson style={{ color: "black", fontSize: "34px" }} />
                            </div>
                            <div>
                                {data?.data?.listed_by}
                            </div>
                        </div>
                        <div className='form-under'>
                            <span style={{ fontSize: "18px" }}>View Contact Details</span>
                            <div className='user-details'>
                                <input placeholder='Name' style={{ height: "30px", width: "60%" }} />
                                <input placeholder='Email' style={{ height: "30px", width: "60%" }} />
                                <input placeholder='Phone Number' style={{ height: "30px", width: "60%" }} />
                            </div>
                            <div>
                                <Checkbox>Allow other agents to contact me</Checkbox>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <span>I am looking for</span>
                                <Checkbox  >Painting Service</Checkbox>
                                <Checkbox  >Interior Design Service</Checkbox>
                            </div>
                            <div
                                className="post-property-botton"
                                style={{ backgroundColor: "orange" }}
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
