import { Router } from 'express';
import { Cart } from '../models/cart.model.js';

const router = Router();

// Simulamos una base de datos de carritos en memoria
const carts = [];

// Ruta raíz POST /: Crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = new Cart();
    carts.push(newCart);
    res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
});

// Ruta GET /:cid: Listar los productos de un carrito por ID
router.get('/:cid', (req, res) => {
    const cid = req.params.cid;
    const cart = carts.find(c => c.id === cid);

    if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    res.json(cart.products); // Devuelve el array de productos del carrito
});

// Ruta POST /:cid/product/:pid: Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cartIndex = carts.findIndex(c => c.id === cid);

    if (cartIndex === -1) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const cart = carts[cartIndex];

    // Buscar si el producto ya existe en el carrito
    const existingProductIndex = cart.products.findIndex(item => item.product === pid);

    if (existingProductIndex !== -1) {
        // Si el producto ya existe, incrementa la cantidad
        cart.products[existingProductIndex].quantity++;
    } else {
        // Si no existe, agrega el producto al carrito
        cart.products.push({ product: pid, quantity: 1 });
    }

    res.json({ message: 'Producto agregado al carrito exitosamente' });
});

export default router;