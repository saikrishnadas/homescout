import React, { useState } from 'react';
import { Dropdown, Checkbox, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"


function BhkFilter() {
    const [checkedList, setCheckedList] = useState([]);
    const options = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK']

    const handleMenuClick = (e) => {
        const { value, checked } = e.target;
        const updatedList = checked
            ? [...checkedList, value]
            : checkedList.filter((item) => item !== value);

        setCheckedList(updatedList);
    };

    const menu = (
        <div className="dropdown-menu">
            <Checkbox.Group value={checkedList} className="dropdown-menu-options">
                {options.map((option) => (
                    <Checkbox key={option} value={option} onChange={handleMenuClick} className="dropdown-menu-options-item" >
                        {option}
                    </Checkbox>
                ))}
            </Checkbox.Group>
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
