import React, { useState } from 'react';
import { Dropdown, Radio, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import { useDispatch } from "react-redux"
import { setBhkFilter } from "../features/filterSilce"


function BhkFilter() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK']
    const dispatch = useDispatch()

    const handleMenuClick = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
        dispatch(setBhkFilter(parseInt(value.toLowerCase().replace("bhk", ""), 10)));
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
                    <span>BHK</span> <span><AiOutlineCaretDown /></span>
                </div>
            </Dropdown>
        </div>
    )
}

export default BhkFilter
