import React, { useState } from 'react';
import { Dropdown, Checkbox, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import PropertyFilter from './PropertyFilter';
import BhkFilter from './BhkFilter';
import BudgetFilter from './BudgetFilter';
import BrokerageFilter from './BrokerageFilter';
import CarpetFilter from './CarpetFilter';
import { useDispatch } from "react-redux"
import { setTypeFilter, setBhkFilter, setBudgetFilter, setCarpetAreaFilter } from '../features/filterSilce';



function Filters() {
    const dispatch = useDispatch()

    const handleReset = () => {
        dispatch(setBhkFilter([]))
        dispatch(setTypeFilter([]))
        dispatch(setBudgetFilter({ min: "", max: "" }))
        dispatch(setCarpetAreaFilter({ min: "", max: "" }))
    }

    return (
        <div className='filters-container'>
            <PropertyFilter />
            <BhkFilter />
            <BudgetFilter />
            {/* <BrokerageFilter /> */}
            <CarpetFilter />
            <div
                className="apply-filter-botton"

            >
                <span
                    className="apply-filter-botton-text"
                >
                    APPLY
                </span>
            </div>
            <div
                className="reset-filter-botton"
                onClick={handleReset}
            >
                <span
                    className="reset-filter-botton-text"
                >
                    RESET
                </span>
            </div>
        </div>
    )
}

export default Filters
