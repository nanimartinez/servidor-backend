import express from 'express';
import carRouter from './router/car.router.js';
import productosRouter from './router/productos.router.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Implementar rutas
app.use('/api/carts', carRouter);
app.use('/api/productos', productosRouter);

// Ruta por defecto para la API
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});