import React, { useState } from 'react';
import { Dropdown, Checkbox, Button, Input } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import { useDispatch, useSelector } from "react-redux"
import { setCarpetAreaFilter } from "../features/filterSilce"


function CarpetFilter() {
    const carpetArea = useSelector((state) => state.filter.carpetArea)
    const dispatch = useDispatch()

    const menu = (
        <div className="dropdown-menu">
            <input placeholder='Min(sqft)' className='budget-input' onChange={(e) => dispatch(setCarpetAreaFilter({ ...carpetArea, min: e.target.value }))} />
            <input placeholder='Max(sqft)' className='budget-input' onChange={(e) => dispatch(setCarpetAreaFilter({ ...carpetArea, max: e.target.value }))} />
        </div>
    );


    return (
        <div >
            <Dropdown overlay={menu} trigger={['click']}>
                <div className='filter-dropdown-button'>
                    <span>CARPET AREA</span> <span><AiOutlineCaretDown /></span>
                </div>
            </Dropdown>

        </div>
    )
}

export default CarpetFilter
