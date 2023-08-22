import React, { useState } from 'react'
import "./PropertiesBar.css"
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';


function PropertiesBar() {

    const [selected, setSelected] = useState(0)
    const navigate = useNavigate();
    const count = useSelector((state) => state.count.propertyCount)

    const handleSelected = (key) => {
        setSelected(key)
    }
    return (
        <div className='propertiesbar-container'>
            <div className='propertiesbar-selector'>
                <div className={selected === 0 ? `property-count-botton-selected` : `property-count-botton`} onClick={() => { handleSelected(0); navigate("/") }}>
                    <span className={selected === 0 ? `property-count-botton-text-selected` : `property-count-botton-text`} >{`PROPERTIES (${count})`}</span>
                </div>
                <div className={selected === 1 ? `property-count-botton-selected` : `property-count-botton`} onClick={() => { handleSelected(1); navigate("/projects") }}>
                    <span className={selected === 1 ? `property-count-botton-text-selected` : `property-count-botton-text`} >{`PROJECTS (0)`}</span>
                </div>
            </div>
            <div className="view-properites-container">
                <div className="view-properites">
                    <CiMenuKebab style={{ color: "black", fontSize: "26px" }} />
                </div>
            </div>
        </div>
    )
}

export default PropertiesBar
