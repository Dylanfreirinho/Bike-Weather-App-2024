import React from 'react';
import { NavLink } from 'react-router-dom';

//  comonent voor de navbar
const Navigation = () => (
    <nav>
        <ul>
            <li>
                <NavLink to="/" activeClassName="link-active">Home</NavLink>
            </li>
            <li>
                <NavLink to="/settings" activeClassName="link-active">Instellingen</NavLink>
            </li>
            <li>
                <NavLink to="/history" activeClassName="link-active">Geschiedenis</NavLink>
            </li>
        </ul>
    </nav>
);

export default Navigation;