import React, { useState } from 'react';
import { Dropdown, Radio, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import { useDispatch } from "react-redux"
import { setBathroomsFilter } from "../features/filterSilce"


function BathroomFilter() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['1B', '2B', '3B', '4B', '5B']
    const dispatch = useDispatch()

    const handleMenuClick = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
        dispatch(setBathroomsFilter(parseInt(value.toLowerCase().replace("b", ""), 10)));
    };

    const menu = (
        <div className="dropdown-menu">
            <Radio.Group value={selectedOption} className="dropdown-menu-options">
                {options.map((option) => (
                    <Radio key={option} value={option} onChange={handleMenuClick} className="dropdown-menu-options-item" >
                        {option}
                    </Radio>
                ))}
            </Radio.Group>
        </div>
    );


    return (
        <div >
            <Dropdown overlay={menu} trigger={['click']}>
                <div className='filter-dropdown-button'>
                    <span>BATHROOMS</span> <span><AiOutlineCaretDown /></span>
                </div>
            </Dropdown>
        </div>
    )
}

export default BathroomFilter
