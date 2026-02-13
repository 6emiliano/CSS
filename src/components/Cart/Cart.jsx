import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, removeItem, clear, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-container">
                    <div className="cart-header">
                        <h2>Tu Carrito</h2>
                    </div>
                    <div className="cart-empty">
                        <p>Tu carrito está vacío</p>
                        <Link to="/" className="continue-shopping-btn">
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h2>Tu Carrito ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</h2>
                </div>

                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p className="cart-item-brand">{item.brand}</p>
                                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                            </div>
                            <div className="cart-item-price-remove">
                                <p className="cart-item-price">${item.price * item.quantity}</p>
                                <button 
                                    className="remove-item-btn" 
                                    onClick={() => removeItem(item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Total:</span>
                        <span className="total-amount">${cartTotal}</span>
                    </div>
                    <div className="cart-actions">
                        <button className="clear-cart-btn" onClick={clear}>
                            Vaciar Carrito
                        </button>
                        <Link to="/checkout" className="checkout-btn">
                            Finalizar Compra
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
