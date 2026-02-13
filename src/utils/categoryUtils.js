/**
 * Utilidad para obtener el color asociado a cada categoría de producto
 * @param {string} category - La categoría del producto
 * @returns {string} - El código de color hexadecimal
 */
export const getCategoryColor = (category) => {
    const colors = {
        'Basketball': '#ff6b35',
        'Running': '#4ecdc4',
        'Urbanas': '#95e1d3'
    };
    return colors[category] || '#ccc';
};
