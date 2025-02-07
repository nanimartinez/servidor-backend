import { v4 as uuidv4 } from 'uuid';

export class Product {
    constructor({ title, description, code, price, status = true, stock, category, thumbnails = [] }) {
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Todos los campos son obligatorios.");
        }

        this.id = uuidv4(); 
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}