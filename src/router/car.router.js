import { Router } from 'express';
import { Cart } from '../models/cart.model.js';

const router = Router();

// Simulamos una base de datos de carritos en memoria
const carts = [];

// Crea un nuevo carrito
router.post('/', (req, res, next) => {
    try {
        const newCart = new Cart();
        carts.push(newCart);
        res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
    } catch (error) {
        error.statusCode = 500; 
        next(error); 
    }
});

// Lista los productos de un carrito por ID
router.get('/:cid', (req, res, next) => {
    try {
        const cid = req.params.cid;
        const cart = carts.find(c => c.id === cid);

        if (!cart) {
            const error = new Error('Carrito no encontrado');
            error.statusCode = 404;
            return next(error);
        }

        res.json(cart.products); 
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
});

//Agrega un producto a un carrito
router.post('/:cid/product/:pid', (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;

        const cartIndex = carts.findIndex(c => c.id === cid);

        if (cartIndex === -1) {
            const error = new Error('Carrito no encontrado');
            error.statusCode = 404;
            return next(error);
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
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
});

export default router;