import { useState, useEffect } from 'react';
import './ItemListContainer.css';
import logoFull from '../../img/Logo_full.png';

const ItemListContainer = () => {
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
        }, 3000); // Cambia cada 3 segundos

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <section className="item-list-container">
            <div className="greeting-message">
                <img src={logoFull} alt="Court Street & Supply" className="logo-full" />
                <h2 className="rotating-message" key={currentMessageIndex}>
                    {messages[currentMessageIndex]}
                </h2>
            </div>
        </section>
    );
}

export default ItemListContainer;
