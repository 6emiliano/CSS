import db from '../db/db.js';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

// Obtiene todos los productos desde Firestore
export const getProducts = async () => {
    try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);
        
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return products;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        throw new Error('Error al cargar los productos');
    }
};

// Obtiene productos filtrados por categoría desde Firestore
export const getProductsByCategory = async (category) => {
    try {
        if (category === 'Todos') {
            return await getProducts();
        }
        
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("category", "==", category));
        const querySnapshot = await getDocs(q);
        
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return products;
    } catch (error) {
        console.error("Error al obtener productos por categoría:", error);
        throw new Error('Error al cargar los productos');
    }
};

// Obtiene un producto específico por ID desde Firestore
export const getProductById = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);
        
        if (!productSnap.exists()) {
            throw new Error('Producto no encontrado');
        }
        
        return {
            id: productSnap.id,
            ...productSnap.data()
        };
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        throw new Error('Producto no encontrado');
    }
};
