import React, { useState } from 'react';
import { Dropdown, Checkbox, Button, Input } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import { useDispatch, useSelector } from "react-redux"
import { setBudgetFilter } from "../features/filterSilce"


function BudgetFilter() {
    const budget = useSelector((state) => state.filter.budget)
    const dispatch = useDispatch()

    const menu = (
        <div className="dropdown-menu">
            <input placeholder='Min' className='budget-input' onChange={(e) => dispatch(setBudgetFilter({ ...budget, min: e.target.value }))} />
            <input placeholder='Max' className='budget-input' onChange={(e) => dispatch(setBudgetFilter({ ...budget, max: e.target.value }))} />
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
