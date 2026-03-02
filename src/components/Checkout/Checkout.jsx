import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { processOrder } from '../../services/orderService';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, clear } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Redirigir a home si el carrito está vacío
    useEffect(() => {
        if (cart.length === 0 && !orderComplete) {
            navigate('/');
        }
    }, [cart, navigate, orderComplete]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones básicas
        if (!formData.name || !formData.email || !formData.phone) {
            alert('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Preparar datos del comprador
            const buyer = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            };

            // Procesar la orden en Firebase (actualiza stock y crea orden)
            const newOrderId = await processOrder(buyer, cart, cartTotal);
            
            // Establecer el ID de orden y marcar como completado
            setOrderId(newOrderId);
            setOrderComplete(true);
            
            // Limpiar carrito después de mostrar el éxito
            setTimeout(() => {
                clear();
            }, 3000);
        } catch (error) {
            console.error('Error al procesar la compra:', error);
            setError(error.message || 'Hubo un error al procesar tu compra. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackHome = () => {
        navigate('/');
    };

    if (orderComplete) {
        return (
            <div className="checkout-page">
                <div className="checkout-container">
                    <div className="success-animation">✓</div>
                    <h2>¡Compra Exitosa!</h2>
                    <div className="order-details">
                        <p className="order-id">Número de Orden: <strong>{orderId}</strong></p>
                        <p>Gracias por tu compra, <strong>{formData.name}</strong></p>
                        <p>Te enviaremos un email de confirmación a <strong>{formData.email}</strong></p>
                    </div>
                    <button className="back-home-btn" onClick={handleBackHome}>
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <div className="checkout-header">
                    <h2>Finalizar Compra</h2>
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
                        
                        {error && (
                            <div className="error-message" style={{
                                backgroundColor: '#fee',
                                border: '1px solid #fcc',
                                color: '#c33',
                                padding: '10px',
                                borderRadius: '5px',
                                marginBottom: '15px'
                            }}>
                                {error}
                            </div>
                        )}
                        
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
                                disabled={loading}
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
                                disabled={loading}
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
                                disabled={loading}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="confirm-purchase-btn"
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : 'Confirmar Compra'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
