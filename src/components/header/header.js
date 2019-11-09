import React from 'react';

import './header.css';

const Header = ({ onToggleData }) => {
    return (
        <div className="header d-flex justify-content-between">
            <div className="d-flex">
                <h3>
                    <a href="#prr">Star DB</a>
                </h3>

                <ul className="d-flex">
                    <li> <a href="#prr1">People</a> </li>
                    <li> <a href="#prr2">Planets</a> </li>
                    <li> <a href="#prr3">Starships</a> </li>
                </ul>
            </div>

            <div className="d-flex align-items-center">
                <button 
                    className="btn btn-md btn-primary"
                    onClick={onToggleData}>
                    Change Data
                </button>
            </div>
        </div>
    );
};

export default Header;