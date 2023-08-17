import moment from 'moment'
import React from 'react'
import "./Property.css"
import { useNavigate } from "react-router-dom"
import {
    AiFillDelete,
} from "react-icons/ai";
import { useDeletePropertyMutation, useGetUserInfoQuery } from './features/propertiesSlice';

function Property({ id, title, rent, carpetArea, bedrooms, bathrooms, parking, propertyDescription, listedBy, listedOn }) {
    const navigate = useNavigate();

    const [deleteProperty, { isLoading, isError, error }] = useDeletePropertyMutation(id);
    const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;
    const { data: userInfo } = useGetUserInfoQuery(user);

    const handleNavigation = () => {
        navigate("/properties/" + id)
    }
    const handleDeleteProperty = async () => {
        await deleteProperty(id);
    }


    return (
        <div className='property-container' onClick={handleNavigation}>
            <div className='property-top-container'>
                {/* Top */}
                <div className='top-image'>
                    Image
                </div>
                <div className='top-details'>
                    <div className='top-title'>
                        <span style={{ display: "flex", alignItems: "center" }}><span style={{ fontWeight: "bold" }}>{title}</span>{" "}{userInfo?._id == listedBy && <span style={{ marginLeft: "10px" }} onClick={handleDeleteProperty}><AiFillDelete /></span>}</span>
                        <span style={{ fontWeight: "bold", fontSize: "24px" }}>₹ {rent}</span>
                    </div>
                    <div className='top-carpet'>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Carpet area</div><div style={{ fontWeight: "bold" }}>{carpetArea} sq.ft</div></div>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Parking</div><div style={{ fontWeight: "bold" }}>{parking ? 'Yes' : 'No'}</div></div>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Bedrooms</div><div style={{ fontWeight: "bold" }}>{bedrooms}</div></div>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Bathrooms</div><div style={{ fontWeight: "bold" }}>{bathrooms}</div></div>
                    </div>
                </div>
            </div>
            <div className='bottom-container'>
                {/* Bottom */}
                <div style={{ fontSize: "14px", color: "grey" }}>
                    {propertyDescription}
                </div>
                <div className='bottom-right-container'>
                    <div>
                        <div><span style={{ color: "grey", fontSize: "14px" }}>Agent:</span> <span style={{ fontSize: "14px", fontWeight: "bold" }}>{listedBy}</span></div>
                        <div><span style={{ color: "grey", fontSize: "14px" }}>Posted :</span> <span style={{ fontSize: "14px", fontWeight: "bold" }}>{moment.duration(moment().diff(moment(listedOn))).humanize()}</span></div>
                    </div>
                    <div className='bottom-right-botton'>
                        CONTACT AGENT
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Property
