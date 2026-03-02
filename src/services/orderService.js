import { collection, addDoc, Timestamp, doc, updateDoc, getDoc, runTransaction } from "firebase/firestore";
import db from "../db/db";

/**
 * Crea una nueva orden en Firestore
 * @param {Object} orderData - Datos de la orden
 * @param {Object} orderData.buyer - Información del comprador (name, email, phone)
 * @param {Array} orderData.items - Items del carrito
 * @param {number} orderData.total - Total de la compra
 * @returns {Promise<string>} ID de la orden creada
 */
export const createOrder = async (orderData) => {
    try {
        const order = {
            buyer: orderData.buyer,
            items: orderData.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: orderData.total,
            date: Timestamp.now(),
            status: "generada"
        };

        // Agregar la orden a la colección "orders"
        const orderRef = await addDoc(collection(db, "orders"), order);
        
        return orderRef.id;
    } catch (error) {
        console.error("Error al crear la orden:", error);
        throw new Error("No se pudo crear la orden. Por favor, intenta nuevamente.");
    }
};

/**
 * Actualiza el stock de los productos después de una compra
 * @param {Array} items - Items comprados
 * @returns {Promise<void>}
 */
export const updateProductStock = async (items) => {
    try {
        // Usar una transacción para garantizar la consistencia de los datos
        await runTransaction(db, async (transaction) => {
            // Leer todos los productos primero
            const productPromises = items.map(item => {
                const productRef = doc(db, "products", item.id);
                return transaction.get(productRef);
            });

            const productDocs = await Promise.all(productPromises);

            // Verificar stock y actualizar
            productDocs.forEach((productDoc, index) => {
                if (!productDoc.exists()) {
                    throw new Error(`Producto ${items[index].id} no encontrado`);
                }

                const currentStock = productDoc.data().stock;
                const quantityPurchased = items[index].quantity;

                if (currentStock < quantityPurchased) {
                    throw new Error(`Stock insuficiente para ${items[index].name}`);
                }

                const productRef = doc(db, "products", items[index].id);
                transaction.update(productRef, {
                    stock: currentStock - quantityPurchased
                });
            });
        });

        console.log("Stock actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar el stock:", error);
        throw new Error("No se pudo actualizar el stock. Por favor, contacta al soporte.");
    }
};

/**
 * Procesa una compra completa: crea la orden y actualiza el stock
 * @param {Object} buyer - Información del comprador
 * @param {Array} items - Items del carrito
 * @param {number} total - Total de la compra
 * @returns {Promise<string>} ID de la orden creada
 */
export const processOrder = async (buyer, items, total) => {
    try {
        // Primero actualizar el stock
        await updateProductStock(items);
        
        // Luego crear la orden
        const orderId = await createOrder({ buyer, items, total });
        
        return orderId;
    } catch (error) {
        console.error("Error al procesar la orden:", error);
        throw error;
    }
};
