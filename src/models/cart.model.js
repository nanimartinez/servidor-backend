import { v4 as uuidv4 } from 'uuid';

export class Cart {
    constructor() {
        this.id = uuidv4(); // Genera un ID único
        this.products = []; // Array de productos en el carrito
    }
}