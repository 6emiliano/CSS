import { Link } from 'react-router-dom';
import { useAddToCart } from '../../hooks/useAddToCart';
import { getCategoryColor } from '../../utils/categoryUtils';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
    const {
        handleAdd,
        availableStock,
        currentCartQuantity,
        quantityAdded,
        message,
        isWarning,
        setQuantityAdded
    } = useAddToCart(product);

    return (
        <div className="item-detail-container">
            <div className="item-detail">
                <div className="item-detail-image-section">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="item-detail-image"
                    />
                    <span 
                        className="item-detail-category-badge" 
                        style={{ backgroundColor: getCategoryColor(product.category) }}
                    >
                        {product.category}
                    </span>
                </div>
                
                <div className="item-detail-info">
                    <div className="item-detail-brand">{product.brand}</div>
                    <h1 className="item-detail-name">{product.name}</h1>
                    <p className="item-detail-description">{product.description}</p>
                    
                    <div className="item-detail-price-stock">
                        <div className="item-detail-price-section">
                            <span className="item-detail-price-label">Precio</span>
                            <span className="item-detail-price">${product.price}</span>
                        </div>
                        <div className="item-detail-stock-section">
                            <span className="item-detail-stock-label">Stock disponible</span>
                            <span className="item-detail-stock">
                                {availableStock} unidades
                                {currentCartQuantity > 0 && (
                                    <span style={{ fontSize: '0.85em', color: '#666', marginLeft: '8px' }}>
                                        ({currentCartQuantity} en carrito)
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="item-detail-actions">
                        {quantityAdded === 0 ? (
                            <>
                                {availableStock > 0 ? (
                                    <ItemCount 
                                        stock={availableStock}
                                        initial={1}
                                        onAdd={handleAdd}
                                    />
                                ) : (
                                    <div className="no-stock-message" style={{ 
                                        padding: '15px', 
                                        backgroundColor: '#ffebee', 
                                        borderRadius: '8px', 
                                        color: '#c62828',
                                        textAlign: 'center',
                                        fontWeight: '500'
                                    }}>
                                        Ya tienes el máximo stock disponible en tu carrito
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="item-detail-purchase-actions">
                                <div 
                                    className="item-detail-added-message"
                                    style={{ 
                                        backgroundColor: isWarning ? '#fff3e0' : '#e8f5e9',
                                        color: isWarning ? '#e65100' : '#2e7d32',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        marginBottom: '15px'
                                    }}
                                >
                                    {isWarning ? '⚠️' : '✓'} {message}
                                </div>
                                <div className="item-detail-buttons">
                                    <Link to="/cart" className="finish-purchase-btn">
                                        Terminar mi compra
                                    </Link>
                                    <button 
                                        className="continue-shopping-btn" 
                                        onClick={() => setQuantityAdded(0)}
                                    >
                                        Seguir Comprando
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
