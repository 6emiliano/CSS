import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const Checkout = ({ onClose }) => {
    const { cart, cartTotal, clear } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateOrderId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `ORD-${timestamp}-${random}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Simular procesamiento de compra
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        setOrderComplete(true);
        
        // Limpiar carrito después de 3 segundos
        setTimeout(() => {
            clear();
        }, 3000);
    };

    if (orderComplete) {
        return (
            <div className="checkout-modal">
                <div className="checkout-content">
                    <div className="success-animation">✓</div>
                    <h2>¡Compra Exitosa!</h2>
                    <div className="order-details">
                        <p className="order-id">Número de Orden: <strong>{orderId}</strong></p>
                        <p>Gracias por tu compra, <strong>{formData.name}</strong></p>
                        <p>Te enviaremos un email de confirmación a <strong>{formData.email}</strong></p>
                    </div>
                    <button className="back-home-btn" onClick={onClose}>
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-modal">
            <div className="checkout-content">
                <div className="checkout-header">
                    <h2>Finalizar Compra</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="checkout-body">
                    <div className="checkout-summary">
                        <h3>Resumen de Compra</h3>
                        <div className="summary-items">
                            {cart.map(item => (
                                <div key={item.id} className="summary-item">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <span>Total:</span>
                            <span className="total-price">${cartTotal}</span>
                        </div>
                    </div>

                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <h3>Datos del Comprador</h3>
                        
                        <div className="form-group">
                            <label htmlFor="name">Nombre Completo *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Juan Pérez"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="juan@ejemplo.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Teléfono *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+54 11 1234-5678"
                                required
                            />
                        </div>

                        <button type="submit" className="confirm-purchase-btn">
                            Confirmar Compra
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
