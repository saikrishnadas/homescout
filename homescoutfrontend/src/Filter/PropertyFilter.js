import React, { useState } from 'react';
import { Dropdown, Checkbox, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import { useDispatch } from "react-redux"
import { setTypeFilter } from "../features/filterSilce"



function PropertyFilter() {
    const [checkedList, setCheckedList] = useState([]);
    const options = ['Apartment', 'Villa', 'Builder Floor'];
    const dispatch = useDispatch()

    const handleMenuClick = (e) => {
        const { value, checked } = e.target;
        const updatedList = checked
            ? [...checkedList, value]
            : checkedList.filter((item) => item !== value);

        setCheckedList(updatedList);
        dispatch(setTypeFilter(updatedList))
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
                    <span>PROPERTY TYPE</span> <span><AiOutlineCaretDown /></span>
                </div>
            </Dropdown>

        </div>
    )
}

export default PropertyFilter
