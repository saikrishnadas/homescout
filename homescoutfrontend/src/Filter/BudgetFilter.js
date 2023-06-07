import React, { useState } from 'react';
import { Dropdown, Checkbox, Button, Input } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"


function BudgetFilter() {


    const menu = (
        <div className="dropdown-menu">
            <input placeholder='Min' className='budget-input' />
            <input placeholder='Max' className='budget-input' />
        </div>
    );


    return (
        <div >
            <Dropdown overlay={menu} trigger={['click']}>
                <div className='filter-dropdown-button'>
                    <span>BUDGET</span> <span><AiOutlineCaretDown /></span>
                </div>
            </Dropdown>

        </div>
    )
}

export default BudgetFilter
