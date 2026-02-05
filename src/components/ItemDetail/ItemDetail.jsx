import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
    const { addItem } = useCart();
    const [showCount, setShowCount] = useState(true);

    const handleAdd = (quantity) => {
        addItem(product, quantity);
        setShowCount(false);
        
        setTimeout(() => {
            setShowCount(true);
        }, 2000);
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Basketball': '#ff6b35',
            'Running': '#4ecdc4',
            'Urbanas': '#95e1d3'
        };
        return colors[category] || '#ccc';
    };

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
                            <span className="item-detail-stock">{product.stock} unidades</span>
                        </div>
                    </div>

                    <div className="item-detail-actions">
                        {showCount ? (
                            <ItemCount 
                                stock={product.stock}
                                initial={1}
                                onAdd={handleAdd}
                            />
                        ) : (
                            <div className="item-detail-added-message">
                                ✓ Agregado al carrito
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
