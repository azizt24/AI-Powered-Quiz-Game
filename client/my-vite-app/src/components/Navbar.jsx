// Navbar.js

import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" exact activeClassName="active">
                Home
            </NavLink>

            <NavLink to="/result" activeClassName="active">
                Results
            </NavLink>
            <NavLink to="/signin" activeClassName="active">
                Sign In
            </NavLink>
        </div>
    );
};

export default Navbar;
