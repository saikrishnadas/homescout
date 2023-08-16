import React, { useEffect, useState } from 'react'
import Filters from './Filter/Filters'
import Navbar from './Navbar'
import PropertiesBar from './PropertiesBar'
import { Dropdown, Checkbox, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Properties.css"
import Property from './Property';
import { useQuery } from "react-query"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPropertyCount } from './features/countSlice';
import { useGetPropertiesQuery, useUpdatePropertiesTypeQuery } from './features/propertiesSlice';



function Properties() {
    const [checkedList, setCheckedList] = useState("Relevance")

    const dispath = useDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get("city");
    const title = queryParams.get("title");
    const bedrooms = queryParams.get("bedrooms");

    const options = ['Relevance', 'Posted On (Recent first)', 'Posted On (Oldest first)', 'Price (High to Low)', 'Price (Low to High)']

    const { data, isLoading, isError, error } = useGetPropertiesQuery();

    // const { data: test } = useUpdatePropertiesTypeQuery();


    // const fetchProperties = () => {
    //     try {
    //         let url = 'http://127.0.0.1:8000/api/properties/filter/';
    //         if (city) {
    //             url += `?city=${city.toLowerCase()}`;
    //         }
    //         if (title) {
    //             url += city ? `&title=${title.toLowerCase()}` : `?title=${title.toLowerCase()}`;
    //         }
    //         if (!city && !title) {
    //             url = "http://127.0.0.1:8000/api/properties"
    //         }
    //         return axios.get(url)
    //     } catch (error) {
    //         throw new Error(error.response.data.message || 'Failed to fetch properties');
    //     }
    // }

    // const { isLoading, data, isError, error } = useQuery(['properties', city], fetchProperties, { refetchOnWindowFocus: true })


    useEffect(() => {
        if (data) {
            dispath(setPropertyCount(data?.length));
        }
    }, [data])

    if (isLoading) {
        return <div>Loading...</div>
    }


    if (isError) {
        return <div>{error.message}</div>
    }


    const menu = (
        <div className="dropdown-menu-options">
            {options.map((option) => (
                <div key={option} value={option} onClick={() => setCheckedList(option)} className="dropdown-menu-options-item">
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
                    <span>{data?.length} - Apartments, Flats For Rent {city && `In ${city}`}</span>
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
                    {data?.map((property) => (

                        <Property key={property._id}
                            id={property._id}
                            title={property.title}
                            rent={property.rent}
                            carpetArea={property.carpet_area}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            parking={property.parking}
                            propertyDescription={property.property_description}
                            listedBy={property.listed_by}
                            listedOn={property.listed_on} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Properties
