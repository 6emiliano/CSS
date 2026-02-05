import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../services/productService';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';
import logoFull from '../../img/Logo_full.png';

const ItemListContainer = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const messages = [
        "Las mejores zapatillas de Basketball, Running y Urbanas",
        "Estilo y rendimiento en cada paso",
        "Tu tienda de zapatillas deportivas de confianza",
        "Encuentra tu próximo par perfecto"
    ];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => 
                (prevIndex + 1) % messages.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [messages.length]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchProducts = async () => {
            try {
                const data = categoryId 
                    ? await getProductsByCategory(categoryId)
                    : await getProducts();
                setProducts(data);
                
                // Actualizar título de la página
                if (categoryId) {
                    document.title = `${categoryId} - Court Street & Supply`;
                } else {
                    document.title = 'Court Street & Supply - Zapatillas Deportivas';
                }
            } catch (err) {
                setError('Error al cargar los productos. Por favor, intenta de nuevo.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return (
        <section className="item-list-container">
            <div className="greeting-message">
                <img src={logoFull} alt="Court Street & Supply" className="logo-full" />
                <h2 className="rotating-message" key={currentMessageIndex}>
                    {messages[currentMessageIndex]}
                </h2>
            </div>

            {loading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            )}

            {error && (
                <div className="error-container">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <ItemList products={products} />
            )}

            {!loading && !error && products.length === 0 && (
                <div className="no-products">
                    <p>No se encontraron productos en esta categoría.</p>
                </div>
            )}
        </section>
    );
}

export default ItemListContainer;
