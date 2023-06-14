import React from 'react'
import Navbar from "./Navbar"
import "./Detail.css"
import { Checkbox } from 'antd';
import {
    GoPerson,
} from "react-icons/go";

function Detail() {
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
                                <span style={{ fontWeight: "bold", fontSize: "22px" }}>3BHK Apartment for Rent</span>
                                <span>in <span style={{ fontWeight: "bold", fontSize: "22px", color: "#37a5a9", cursor: "pointer" }}>Aluva</span></span>
                            </div>
                            <div className='overview-sqft'>
                                {/* Sq ft area */}
                                <span style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "20px" }}>₹10,000</span>
                                <div className='overview-area-wrap'>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Super Built-Up Area</span><span style={{ fontWeight: "bold" }}>1200 Sq.Ft</span></div>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Carpet Area</span><span style={{ fontWeight: "bold" }}>960 Sq.Ft</span></div>
                                    <div className='overview-area-wrap-inner'><span style={{ color: "grey" }}>Bedrooms</span><span style={{ fontWeight: "bold" }}>3</span></div>
                                </div>
                                <div className='overview-area-wrap-inner' style={{ marginLeft: "8%", }}><span style={{ color: "grey" }}>Bathroom</span><span style={{ fontWeight: "bold" }}>3</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='features'>
                        <span className='features-main-title'>OVERVIEW</span>
                        <div className='features-items'>
                            <div className='feature-item'><span className='feature-item-title'>Parking</span><span>No</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Furnishing State</span><span>Semi Furnished</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Listed by</span><span>Kochi Marketing Team</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Property on</span><span>Ground Floor</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Listed on</span><span>26-Apr</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Security Deposit</span><span>20000</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Pet Allowed</span><span>No</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Non Vegetarian</span><span>Yes</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Brokerage terms</span><span>No</span></div>
                            <div className='feature-item'><span className='feature-item-title'>Bachelors Allowed</span><span>No</span></div>
                        </div>
                    </div>
                    <div className='description-container'>
                        <span className='description-title'>Property Description</span>
                        <div style={{ marginTop: "20px" }}>This property is a 3 BHK Apartment in Aluva and is available for Rent</div>
                    </div>
                </div>
                <div >
                    <div className='user-form' style={{ border: "3px solid #37a5a9", paddingTop: "10px" }}>
                        <div className='profile-container'>
                            <div>
                                <GoPerson style={{ color: "black", fontSize: "34px" }} />
                            </div>
                            <div>
                                Kochi Marking Team
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
