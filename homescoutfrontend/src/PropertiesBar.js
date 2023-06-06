import React, { useState } from 'react'
import "./PropertiesBar.css"
import { CiMenuKebab } from "react-icons/ci";

function PropertiesBar() {
    const [selected, setSelected] = useState(0)

    const handleSelected = (key) => {
        setSelected(key)
    }
    return (
        <div className='propertiesbar-container'>
            <div className='propertiesbar-selector'>
                <div className={selected === 0 ? `property-count-botton-selected` : `property-count-botton`} onClick={() => handleSelected(0)}>
                    <span className={selected === 0 ? `property-count-botton-text-selected` : `property-count-botton-text`} >{`PROPERTIES (1169)`}</span>
                </div>
                <div className={selected === 1 ? `property-count-botton-selected` : `property-count-botton`} onClick={() => handleSelected(1)}>
                    <span className={selected === 1 ? `property-count-botton-text-selected` : `property-count-botton-text`} >{`PROJECTS (2)`}</span>
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
