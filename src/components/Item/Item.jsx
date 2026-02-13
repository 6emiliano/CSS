import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAddToCart } from '../../hooks/useAddToCart';
import { getCategoryColor } from '../../utils/categoryUtils';
import ItemCount from '../ItemCount/ItemCount';
import './Item.css';

const Item = ({ product }) => {
    const {
        handleAdd,
        availableStock,
        currentCartQuantity,
        quantityAdded,
        message,
        isWarning,
        reset
    } = useAddToCart(product);

    // Auto-resetear mensaje después de 3 segundos (para cards de listado)
    useEffect(() => {
        if (quantityAdded > 0) {
            const timer = setTimeout(() => {
                reset();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [quantityAdded, reset]);

    return (
        <div className="item-card">
            <div className="item-image-container">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="item-image"
                />
                <span 
                    className="category-badge" 
                    style={{ backgroundColor: getCategoryColor(product.category) }}
                >
                    {product.category}
                </span>
            </div>
            
            <div className="item-content">
                <div className="item-brand">{product.brand}</div>
                <h3 className="item-name">{product.name}</h3>
                <p className="item-description">{product.description}</p>
                
                <div className="item-price-stock">
                    <span className="item-price">${product.price}</span>
                    <span className="item-stock">
                        Stock: {availableStock}
                        {currentCartQuantity > 0 && (
                            <span style={{ fontSize: '0.85em', color: '#666' }}>
                                {' '}({currentCartQuantity} en carrito)
                            </span>
                        )}
                    </span>
                </div>

                {availableStock > 0 ? (
                    <ItemCount 
                        stock={availableStock}
                        initial={1}
                        onAdd={handleAdd}
                        compact={true}
                    />
                ) : (
                    <div style={{ 
                        padding: '10px', 
                        backgroundColor: '#ffebee', 
                        borderRadius: '6px', 
                        color: '#c62828',
                        textAlign: 'center',
                        fontSize: '0.9em',
                        fontWeight: '500',
                        marginBottom: '10px'
                    }}>
                        Stock máximo en carrito
                    </div>
                )}

                {quantityAdded > 0 && message && (
                    <div 
                        className="item-added-message"
                        style={{
                            backgroundColor: isWarning ? '#fff3e0' : '#e8f5e9',
                            color: isWarning ? '#e65100' : '#2e7d32',
                            borderLeft: `3px solid ${isWarning ? '#e65100' : '#2e7d32'}`
                        }}
                    >
                        {isWarning ? '⚠️' : '✓'} {message}
                    </div>
                )}
                
                <Link to={`/item/${product.id}`} className="item-detail-link">
                    Ver Detalle Completo
                </Link>
            </div>
        </div>
    );
};

export default Item;
