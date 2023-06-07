import React from 'react'
import Filters from './Filter/Filters'
import Navbar from './Navbar'
import PropertiesBar from './PropertiesBar'

function Properties() {
    return (
        <div>
            <Navbar />
            <PropertiesBar />
            <Filters />
            <div>Show all Properties</div>
        </div>
    )
}

export default Properties
