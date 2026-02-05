import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        getProductById(id)
            .then(data => {
                setProduct(data);
                // Actualizar título de la página
                document.title = `${data.name} - Court Street & Supply`;
            })
            .catch(err => {
                setError('Producto no encontrado');
                console.error(err);
                document.title = 'Producto no encontrado - Court Street & Supply';
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="item-detail-loading">
                <div className="loading-spinner"></div>
                <p>Cargando producto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="item-detail-error">
                <h2>😕 {error}</h2>
                <p>El producto que buscas no existe o fue eliminado.</p>
                <a href="/" className="back-to-home">Volver al catálogo</a>
            </div>
        );
    }

    return product ? <ItemDetail product={product} /> : null;
};

export default ItemDetailContainer;
