import React from 'react'
import "./Property.css"

function Property() {
    return (
        <div className='property-container'>
            <div className='property-top-container'>
                {/* Top */}
                <div className='top-image'>
                    Image
                </div>
                <div className='top-details'>
                    <div className='top-title'>
                        <span style={{ fontWeight: "bold" }}>Semi Furnished 1 BHK Apartment for Rent in Kalamassery</span>
                        <span style={{ fontWeight: "bold", fontSize: "24px" }}>₹ 5,000</span>
                    </div>
                    <div className='top-carpet'>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Carpet area</div><div style={{ fontWeight: "bold" }}>240 sq.ft</div></div>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Available From</div><div style={{ fontWeight: "bold" }}>NA</div></div>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Floor</div><div style={{ fontWeight: "bold" }}>Ground Floor</div></div>
                        <div className='top-carpert-container'><div className='top-carpet-text'>Bathrooms</div><div style={{ fontWeight: "bold" }}>1</div></div>
                    </div>
                </div>
            </div>
            <div className='bottom-container'>
                {/* Bottom */}
                <div style={{ fontSize: "14px", color: "grey" }}>
                    This property is a 1 BHK Apartment in Kalamassery
                </div>
                <div className='bottom-right-container'>
                    <div>
                        <div><span style={{ color: "grey", fontSize: "14px" }}>Agent:</span> <span style={{ fontSize: "14px", fontWeight: "bold" }}>Kochi Marketing Te...</span></div>
                        <div><span style={{ color: "grey", fontSize: "14px" }}>Posted :</span> <span style={{ fontSize: "14px", fontWeight: "bold" }}>1 day ago</span></div>
                    </div>
                    <div className='bottom-right-botton'>
                        CONTACT AGENT
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Property
