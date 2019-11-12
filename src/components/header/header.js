import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ onToggleData }) => {
    return (
        <div className="header d-flex justify-content-between">
            <div className="d-flex">
                <h3>
                    {<Link to="/" exact='true'>Star DB</Link>}
                </h3>

                <ul className="d-flex">
                    <li> <Link to="/people/">People</Link> </li>
                    <li> <Link to="/planets/">Planets</Link> </li>
                    <li> <Link to="/starships/">Starships</Link> </li>
                    <li> <Link to="/login">Login</Link> </li>
                    <li> <Link to="/secret">Secret</Link> </li>
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