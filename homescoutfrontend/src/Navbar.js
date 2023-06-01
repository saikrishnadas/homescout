import React from "react";
import {
    GoThreeBars,
    GoSearch,
    GoTriangleDown,
    GoPerson,
} from "react-icons/go";
import "./Navbar.css";
import { Button, Dropdown, Space } from "antd";

const items = [
    {
        key: "1",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                1st menu item
            </a>
        ),
    },
    {
        key: "2",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                2nd menu item
            </a>
        ),
    },
    {
        key: "3",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
            >
                3rd menu item
            </a>
        ),
    },
];

function Navbar() {
    return (
        <div
            className="navbar-container"
        >
            <div className="navbar-left">
                <div>
                    <GoThreeBars style={{ color: "white", fontSize: "30px" }} />
                </div>
                <div className="company-logo">LOGO</div>
            </div>
            <div>
                <div class="search-container">
                    <Dropdown trigger={["click"]} menu={{ items }} placement="bottom">
                        <div
                            className="location-change-menu"
                        >
                            <span
                                className="location"
                            >
                                Kochi
                            </span>
                            <span>
                                <GoTriangleDown />
                            </span>
                        </div>
                    </Dropdown>
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                        <GoSearch style={{ color: "white", fontSize: "18px" }} />
                    </button>
                </div>
            </div>
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                        <GoPerson style={{ color: "white", fontSize: "24px" }} />
                    </div>
                    <div
                        className="post-property-botton"
                    >
                        <span
                            className="post-property-botton-text"
                        >
                            POST PROPERTY
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
