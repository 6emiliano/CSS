import { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
    const [count, setCount] = useState(initial);

    const handleIncrement = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleAdd = () => {
        if (stock > 0) {
            onAdd(count);
        }
    };

    return (
        <div className="item-count">
            <div className="counter-controls">
                <button 
                    className="counter-btn" 
                    onClick={handleDecrement}
                    disabled={count <= 1}
                >
                    -
                </button>
                <span className="counter-display">{count}</span>
                <button 
                    className="counter-btn" 
                    onClick={handleIncrement}
                    disabled={count >= stock}
                >
                    +
                </button>
            </div>
            <button 
                className="add-to-cart-btn" 
                onClick={handleAdd}
                disabled={stock === 0}
            >
                {stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
        </div>
    );
};

export default ItemCount;
