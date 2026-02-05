import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ product }) => {

    const getCategoryColor = (category) => {
        const colors = {
            'Basketball': '#ff6b35',
            'Running': '#4ecdc4',
            'Urbanas': '#95e1d3'
        };
        return colors[category] || '#ccc';
    };

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
                
                <div className="item-footer">
                    <div className="item-price-stock">
                        <span className="item-price">${product.price}</span>
                        <span className="item-stock">Stock: {product.stock}</span>
                    </div>
                    
                    <Link to={`/item/${product.id}`} className="item-detail-link">
                        Ver Detalle
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Item;
