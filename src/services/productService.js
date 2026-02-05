import products from '../data/products';

// Simula un delay de red para hacer más realista la llamada a API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Obtiene todos los productos
export const getProducts = async () => {
    await delay(800); // Simula latencia de 800ms
    return products;
};

// Obtiene productos filtrados por categoría
export const getProductsByCategory = async (category) => {
    await delay(800);
    if (category === 'Todos') {
        return products;
    }
    return products.filter(product => product.category === category);
};

// Obtiene un producto específico por ID
export const getProductById = async (id) => {
    await delay(500);
    const product = products.find(product => product.id === parseInt(id));
    if (!product) {
        throw new Error('Producto no encontrado');
    }
    return product;
};
