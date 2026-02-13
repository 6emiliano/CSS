import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';
import logo from '../../img/logo_redu.png';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo" onClick={closeMenu}>
                <img src={logo} alt="Court Street & Supply" />
            </Link>
            
            <button className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => `category-btn ${isActive ? 'active' : ''}`}
                        onClick={closeMenu}
                        end
                    >
                        Todos
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/category/Basketball" 
                        className={({ isActive }) => `category-btn ${isActive ? 'active' : ''}`}
                        onClick={closeMenu}
                    >
                        Basketball
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/category/Running" 
                        className={({ isActive }) => `category-btn ${isActive ? 'active' : ''}`}
                        onClick={closeMenu}
                    >
                        Running
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/category/Urbanas" 
                        className={({ isActive }) => `category-btn ${isActive ? 'active' : ''}`}
                        onClick={closeMenu}
                    >
                        Urbanas
                    </NavLink>
                </li>
            </ul>

            <CartWidget />
        </nav>  
    );
}

export default NavBar;
