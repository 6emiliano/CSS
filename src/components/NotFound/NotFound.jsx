import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Página no encontrada</h2>
                <p className="not-found-message">
                    Lo sentimos, la página que buscas no existe o fue movida.
                </p>
                <Link to="/" className="not-found-button">
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
