import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { BsBag } from "react-icons/bs";
import './CartWidget.css';

const CartWidget = () => {
    const { cartCount } = useCart();

    // No mostrar el widget si no hay items en el carrito
    if (cartCount === 0) {
        return null;
    }

    return (
        <Link to="/cart" className="cart-widget">
            <BsBag className="cart-icon" />
            <span className="cart-badge">{cartCount}</span>
        </Link>
    );
}

export default CartWidget;
