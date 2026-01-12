import { useState } from 'react';
import { BsBag } from "react-icons/bs";
import './CartWidget.css';

const CartWidget = () => {
    // Contador en 3
    const [cartCount] = useState(3);

    return (
        <div className="cart-widget">
            <BsBag className="cart-icon" />
            {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
            )}
        </div>
    );
}

export default CartWidget;
