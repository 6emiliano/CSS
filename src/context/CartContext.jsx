import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agregar item al carrito
    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            // Si ya existe, actualizar cantidad
            setCart(cart.map(cartItem => 
                cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            ));
        } else {
            // Si no existe, agregar nuevo item
            setCart([...cart, { ...item, quantity }]);
        }
    };

    // Remover item del carrito
    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Limpiar todo el carrito
    const clear = () => {
        setCart([]);
    };

    // Verificar si un item está en el carrito
    const isInCart = (id) => {
        return cart.some(item => item.id === id);
    };

    // Obtener cantidad de un producto específico
    const getQuantity = (id) => {
        const item = cart.find(item => item.id === id);
        return item ? item.quantity : 0;
    };

    // Total de items en el carrito
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Total del precio del carrito
    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addItem,
            removeItem,
            clear,
            isInCart,
            getQuantity,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
