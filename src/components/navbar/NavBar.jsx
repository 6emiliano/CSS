import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';
import logo from '../../img/logo_redu.png';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Court Street & Supply" />
            </div>
            
            <ul className="navbar-links">
                <li><a href="#basketball">Basketball</a></li>
                <li><a href="#running">Running</a></li>
                <li><a href="#urbanas">Urbanas</a></li>
            </ul>

            <CartWidget />
        </nav>  
    );
}

export default NavBar;
