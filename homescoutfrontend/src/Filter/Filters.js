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
import { useNavigate, useLocation } from 'react-router-dom';
import { setTypeFilter, setBhkFilter, setBudgetFilter, setCarpetAreaFilter, selectBhk, selectType, setBathroomsFilter, selectBathrooms } from '../features/filterSilce';
import { setProperties, useGetFilterPropertiesQuery } from '../features/propertiesSlice';
import BathroomFilter from './BathroomFilter';



function Filters() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const bhkState = useSelector(selectBhk);
    const typeState = useSelector(selectType)
    const bathroomState = useSelector(selectBathrooms);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bedrooms = Number(queryParams.get("bedrooms"));
    const bathrooms = Number(queryParams.get("bathrooms"));
    const propertyType = queryParams.get("type");
    const { data: properties } = useGetFilterPropertiesQuery({ bedrooms, propertyType, bathrooms }, { skip: bedrooms === 0 && propertyType === null && bathrooms === 0 });

    if (properties) {
        dispatch(setProperties(properties))
    }


    const handleFilter = async () => {
        let queryString = ""
        if (bhkState) {
            queryString += `?bedrooms=${bhkState}`
            if (typeState) {
                queryString += `&type=${typeState}`
            }
            if (bathroomState) {
                queryString += `&bathrooms=${bathroomState}`
            }
        } else if (typeState) {
            queryString += `?type=${typeState}`
            if (bathroomState) {
                queryString += `&bathrooms=${bathroomState}`
            }
        } else if (bathroomState) {
            queryString += `?bathrooms=${bathroomState}`
        } else {
            queryString = ""
        }
        navigate(queryString)
    }

    const handleReset = () => {
        dispatch(setBhkFilter([]))
        dispatch(setTypeFilter([]))
        dispatch(setBathroomsFilter([]))
        // dispatch(setBudgetFilter({ min: "", max: "" }))
        // dispatch(setCarpetAreaFilter({ min: "", max: "" }))
        navigate("/")
    }


    return (
        <div className='filters-container'>
            <PropertyFilter />
            <BhkFilter />
            <BathroomFilter />
            {/* <BudgetFilter /> */}
            {/* <BrokerageFilter /> */}
            {/* <CarpetFilter /> */}
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
