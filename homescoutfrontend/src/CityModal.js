import React, { useState } from 'react'
import mumbai from "./images/mumbai.svg"
import delhi from "./images/delhi.png"
import bangalore from "./images/bangalore.png"
import hyderbad from "./images/hyderbad.png"
import pune from "./images/pune.png"
import chennai from "./images/chennai.webp"
import kochi from "./images/kochi.png"
import { Modal } from "antd";
import "./CityModal.css"
import { useNavigate } from 'react-router-dom';

const cities = [
    "Agra",
    "Ahmedabad",
    "Aurangabad",
    "Bangalore",
    "Bhopal",
    "Chennai",
    "Delhi",
    "Faridabad",
    "Ghaziabad",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kanpur",
    "Kochi",
    "Kolkata",
    "Ludhiana",
    "Lucknow",
    "Meerut",
    "Mumbai",
    "Nagpur",
    "Nashik",
    "Patna",
    "Pune",
    "Rajkot",
    "Srinagar",
    "Surat",
    "Thane",
    "Varanasi",
    "Vadodara",
    "Visakhapatnam"
]

const mainCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Kochi"
]


function CityModal() {
    const naviagte = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal open={isModalOpen}
            footer={null}
            header={null}
            closable={false}
        >
            <>
                <div className="icons-container">
                    <div className="icon-text" onClick={() => naviagte(`?city=mumbai`)}>
                        <img className="icon-image-container" src={mumbai} alt="mumbai" />

                        <div>
                            Mumbai
                        </div>
                    </div>

                    <div className="icon-text" onClick={() => naviagte(`?city=delhi`)}>
                        <div>
                            <img className="icon-image-container" src={delhi} alt="delhi" />
                        </div>
                        <div>
                            Delhi
                        </div>
                    </div>

                    <div className="icon-text" onClick={() => naviagte(`?city=bangalore`)}>
                        <div>
                            <img className="icon-image-container" src={bangalore} alt="bangalore" />
                        </div>
                        <div>
                            Bangalore
                        </div>
                    </div>

                    <div className="icon-text" onClick={() => naviagte(`?city=hyderbad`)}>
                        <div>
                            <img className="icon-image-container" src={hyderbad} alt="hyderbad" />
                        </div>
                        <div>
                            Hyderabad
                        </div>
                    </div>

                    <div className="icon-text" onClick={() => naviagte(`?city=pune`)}>
                        <div>
                            <img className="icon-image-container" src={pune} alt="pune" />
                        </div>
                        <div>
                            Pune
                        </div>
                    </div>

                    <div className="icon-text" onClick={() => naviagte(`?city=chennai`)}>
                        <div>
                            <img className="icon-image-container" src={chennai} alt="chennai" />
                        </div>
                        <div>
                            Chennai
                        </div>
                    </div>

                    <div className="icon-text" onClick={() => naviagte(`?city=kochi`)}>
                        <div>
                            <img className="icon-image-container" src={kochi} alt="kochi" />
                        </div>
                        <div>
                            Kochi
                        </div>
                    </div>
                </div>
                <div className="other-cities-button">Other cities</div>
                <div className="other-cities-container">
                    {cities.filter(city => !mainCities.includes(city)).map(city => (
                        <div className="other-city" onClick={() => naviagte(`?city=${city.toLowerCase()}`)}>{city}</div>
                    ))}
                </div>
            </>
        </Modal>
    )
}

export default CityModal
