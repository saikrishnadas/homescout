import React, { useState } from 'react'
import Filters from './Filter/Filters'
import Navbar from './Navbar'
import PropertiesBar from './PropertiesBar'
import { Dropdown, Checkbox, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Properties.css"
import Property from './Property';
import { useQuery } from "react-query"
import axios from 'axios';




function Projects() {
    const [checkedList, setCheckedList] = useState("Relevance")
    const options = ['Relevance', 'Posted On (Recent first)', 'Posted On (Oldest first)', 'Price (High to Low)', 'Price (Low to High)']

    const fetchProperties = () => {
        return axios.get("http://127.0.0.1:8000/api/properties")
    }

    const { isLoading, data, isError, error } = useQuery("properties", fetchProperties)

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
                    <span>0 - Projects</span>
                    <div className='properties-sort-button'>
                        <span>Sort by: </span>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <div className='sort-dropdown-button'>
                                <span>{checkedList}</span> <span><AiOutlineCaretDown /></span>
                            </div>
                        </Dropdown>
                    </div>
                </div>
                {/* <div style={{ marginTop: "10px", marginBottom: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {data?.data.map((property) => (

                        <Property key={property.id}
                            id={property.id}
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
                </div> */}
            </div>
        </div>
    )
}

export default Projects
