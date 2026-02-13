import { useState } from 'react';
import { useCart } from '../context/CartContext';

/**
 * Custom hook para manejar la lógica de agregar productos al carrito
 * con validación de stock y gestión de mensajes
 * @param {Object} product - El producto a agregar
 * @returns {Object} - Funciones y estados necesarios para agregar al carrito
 */
export const useAddToCart = (product) => {
    const { addItem, getQuantity } = useCart();
    const [quantityAdded, setQuantityAdded] = useState(0);
    const [message, setMessage] = useState('');
    const [isWarning, setIsWarning] = useState(false);

    // Calcular stock disponible considerando lo que ya está en el carrito
    const currentCartQuantity = getQuantity(product.id);
    const availableStock = product.stock - currentCartQuantity;

    /**
     * Maneja la acción de agregar productos al carrito
     * @param {number} quantity - Cantidad a agregar
     * @returns {Object} - Resultado de la operación
     */
    const handleAdd = (quantity) => {
        const result = addItem(product, quantity);
        
        if (result.success) {
            setQuantityAdded(result.quantityAdded);
            setMessage(result.message);
            setIsWarning(result.quantityAdded < quantity);
        } else {
            setMessage(result.message);
            setIsWarning(true);
            setQuantityAdded(0);
        }
        
        return result;
    };

    /**
     * Resetea los estados del hook
     */
    const reset = () => {
        setQuantityAdded(0);
        setMessage('');
        setIsWarning(false);
    };

    return {
        handleAdd,
        availableStock,
        currentCartQuantity,
        quantityAdded,
        message,
        isWarning,
        setQuantityAdded,
        reset
    };
};
