import "./navi.css";

import React from "react";

import Sidebar from "./sidebar";

/**
 * NavigationPage component.
 * @returns The rendered NavigationPage component.
 */
const NavigationPage = (): JSX.Element => (
    <div className="navigation-container">
        <Sidebar />
        <div className="main-content">
            <div>
                <h1 className="text-4xl font-bold ">{"Stores Near You"}</h1>
            </div>
            <div className="row">
                <div className="item">{"Item 1"}</div>
                <div className="item">{"Item 1"}</div>
                <div className="item">{"Item 1"}</div>
                <div className="item">{"Item 1"}</div>
                <div className="item">{"Item 1"}</div>
                <div className="item">{"Item 1"}</div>
            </div>
        </div>
    </div>

);

export default NavigationPage;
