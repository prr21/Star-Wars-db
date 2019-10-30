import React from 'react';

import './header.css';

const Header = () => {
    return (
        <div className="header d-flex">
            <h3>
                <a href="#prr">Star DB</a>
            </h3>

            <ul className="d-flex">
                <li> <a href="#prr1">People</a> </li>
                <li> <a href="#prr2">Planets</a> </li>
                <li> <a href="#prr3">Starships</a> </li>
            </ul>
        </div>
    );
};

export default Header;