import React, { useState } from 'react';
import { Dropdown, Radio, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import { useDispatch } from "react-redux"
import { setTypeFilter } from "../features/filterSilce"



function PropertyFilter() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = ['Apartment', 'Villa', 'Builder Floor'];
    const dispatch = useDispatch()

    const handleMenuClick = (e) => {
        const { value } = e.target;
        setSelectedOption(value);
        dispatch(setTypeFilter(value.toLowerCase().replace(/\s+/g, '_')));
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
                    <span>PROPERTY TYPE</span> <span><AiOutlineCaretDown /></span>
                </div>
            </Dropdown>

        </div>
    )
}

export default PropertyFilter
