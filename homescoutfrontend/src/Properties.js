import React, { useEffect, useState } from 'react'
import Filters from './Filter/Filters'
import Navbar from './Navbar'
import PropertiesBar from './PropertiesBar'
import { Dropdown, Spin } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Properties.css"
import Property from './Property';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPropertyCount } from './features/countSlice';
import { selectProperties, setProperties, useGetPropertiesQuery, useGetSortedPropertiesQuery, useGetUserInfoQuery } from './features/propertiesSlice';



function Properties() {
    const [checkedList, setCheckedList] = useState("relevance")
    const navigate = useNavigate();

    const dispath = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get("city");
    const title = queryParams.get("title");
    const bedrooms = queryParams.get("bedrooms");

    const options = ['Relevance', 'Posted On (Recent first)', 'Posted On (Oldest first)', 'Price (High to Low)', 'Price (Low to High)']

    const { data, isLoading, isError, error } = useGetPropertiesQuery();
    const allProperties = useSelector(selectProperties);
    const { data: sortedData } = useGetSortedPropertiesQuery(checkedList, { skip: checkedList === "relevance" });

    const user = localStorage.getItem("user") ? localStorage.getItem("user") : null;
    const { data: userInfo } = useGetUserInfoQuery(user);

    useEffect(() => {
        // Redirect to "/properties" when the root path ("/") is accessed
        navigate('/properties');
    }, [navigate]);

    useEffect(() => {
        if (data) {
            dispath(setPropertyCount(data?.length));
            dispath(setProperties(data))
        }
    }, [data])

    useEffect(() => {
        if (checkedList !== "relevance") {
            dispath(setPropertyCount(data?.length));
            dispath(setProperties(sortedData))
        }
    }, [checkedList])

    if (isLoading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItem: "center" }}><Spin size="large" /></div>
    }



    if (isError) {
        return <div>{error.message}</div>
    }

    const handleSortOption = async (option) => {
        if (option === "Relevance") {
            setCheckedList("relevance")
        } else if (option === "Posted On (Recent first)") {
            setCheckedList("recent")
        } else if (option === "Posted On (Oldest first)") {
            setCheckedList("old")
        } else if (option === "Price (High to Low)") {
            setCheckedList("priceHighToLow")
        } else if (option === "Price (Low to High)") {
            setCheckedList("priceLowToHigh")
        } else {
            setCheckedList("relevance")
        }
    }


    const menu = (
        <div className="dropdown-menu-options">
            {options.map((option) => (
                <div key={option} value={option} onClick={() => handleSortOption(option)} className="dropdown-menu-options-item">
                    {option}
                </div>
            ))}
        </div>
    );

    return (
        <div>
            <Navbar />
            <PropertiesBar />
            <Filters />
            <div className='properties-container'>
                <div className='properties-sort-container'>
                    <span className='properties-sort-text-large'>{allProperties?.length} - Apartments, Houses For Rent {city && `In ${city}`}</span>
                    <div className='properties-sort-button'>
                        <span>Sort by: </span>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <div className='sort-dropdown-button'>
                                <span>{checkedList}</span> <span><AiOutlineCaretDown /></span>
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {allProperties?.map((property) => (

                        <Property key={property._id}
                            id={property._id}
                            title={property.title}
                            rent={property.rent}
                            carpetArea={property.carpetArea}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            parking={property.parking}
                            propertyDescription={property.propertyDescription}
                            listedBy={property.listedBy}
                            listedOn={property.listedOn} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Properties
