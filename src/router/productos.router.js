import { Router } from 'express';
import { Product } from '../models/product.model.js';

const router = Router();

//Simulamos una base de datos en memoria
const productos = [];

// Ruta raíz GET /: Listar todos los productos
router.get('/', (req, res) => {
    const limit = req.query.limit;
    const result = limit ? productos.slice(0, limit) : productos;
    res.json(result);
});

// Ruta GET /:pid: Traer un producto por ID
router.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    const producto = productos.find(p => p.id === pid);

    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(producto);
});

// Ruta raíz POST /: Agregar un nuevo producto
router.post('/', (req, res) => {
    try {
        const newProductData = req.body;
        const newProduct = new Product(newProductData);
        productos.push(newProduct);
        res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Ruta PUT /:pid: Actualizar un producto por ID
router.put('/:pid', (req, res) => {
    const pid = req.params.pid;
    const updates = req.body;

    const productIndex = productos.findIndex(p => p.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // No permitir la actualización del ID
    delete updates.id;

    // Realizar la actualización
    productos[productIndex] = { ...productos[productIndex], ...updates };

    res.json({ message: 'Producto actualizado exitosamente' });
});

// Ruta DELETE /:pid: Eliminar un producto por ID
router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    const productIndex = productos.findIndex(p => p.id === pid);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    productos.splice(productIndex, 1); // Elimina el producto del array

    res.json({ message: 'Producto eliminado exitosamente' });
});

export default router;