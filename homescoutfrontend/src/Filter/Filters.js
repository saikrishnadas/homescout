import React, { useState } from 'react';
import { Dropdown, Checkbox, Button } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import "./Filters.css"
import PropertyFilter from './PropertyFilter';
import BhkFilter from './BhkFilter';
import BudgetFilter from './BudgetFilter';
import BrokerageFilter from './BrokerageFilter';
import CarpetFilter from './CarpetFilter';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { setTypeFilter, setBhkFilter, setBudgetFilter, setCarpetAreaFilter, selectBhk, selectType } from '../features/filterSilce';
import { setProperties, useGetFilterPropertiesQuery, useLazyGetFilterPropertiesQuery } from '../features/propertiesSlice';



function Filters() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const bhk = useSelector(selectBhk)
    const type = useSelector(selectType);

    const [getProperties, { data: properties }] = useLazyGetFilterPropertiesQuery();


    const handleFilter = async () => {
        console.log(bhk)
        console.log(type)
        let queryString = ""
        let queryParams = {}
        if (bhk) {
            queryString += `?bedrooms=${bhk}`
            queryParams.bedrooms = bhk;
            if (type) {
                queryString += `&type=${type}`
                queryParams.type = type;
            }
        } else if (type) {
            queryString += `?type=${type}`
            queryParams.type = type;
        } else {
            queryString = ""
            queryParams = {}
        }
        navigate(queryString)
        await getProperties(queryParams)
        dispatch(setProperties(properties))
    }

    const handleReset = () => {
        dispatch(setBhkFilter([]))
        dispatch(setTypeFilter([]))
        dispatch(setBudgetFilter({ min: "", max: "" }))
        dispatch(setCarpetAreaFilter({ min: "", max: "" }))
        navigate("/properties")
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
                onClick={handleFilter}
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
