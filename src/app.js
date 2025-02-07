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
// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Log del error para depuración

    // Determinar el código de estado
    const statusCode = err.statusCode || 500; // Si el error tiene un código de estado, úsalo, sino, usa 500 (Error interno del servidor)

    // Determinar el mensaje de error
    const message = err.message || 'Error interno del servidor'; // Si el error tiene un mensaje, úsalo, sino, usa un mensaje genérico

    res.status(statusCode).json({
        status: 'error', // Para indicar que es una respuesta de error
        message: message,
    });
});