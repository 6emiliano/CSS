import { useCart } from '../../context/CartContext';
import { BsBag } from "react-icons/bs";
import './CartWidget.css';

const CartWidget = ({ onClick }) => {
    const { cartCount } = useCart();

    return (
        <div className="cart-widget" onClick={onClick}>
            <BsBag className="cart-icon" />
            {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
            )}
        </div>
    );
}

export default CartWidget;
