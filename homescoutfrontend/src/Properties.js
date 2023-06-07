import React, { useState } from 'react'
import Filters from './Filter/Filters'
import Navbar from './Navbar'
import PropertiesBar from './PropertiesBar'
import { Dropdown, Checkbox, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Properties.css"
import Property from './Property';

function Properties() {
    const [checkedList, setCheckedList] = useState("Relevance")
    const options = ['Relevance', 'Posted On (Recent first)', 'Posted On (Oldest first)', 'Price (High to Low)', 'Price (Low to High)']

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
                    <span>249 - Apartments, Flats For Rent In Kochi</span>
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
                    <Property />
                    <Property />
                    <Property />
                    <Property />
                    <Property />
                </div>
            </div>
        </div>
    )
}

export default Properties
