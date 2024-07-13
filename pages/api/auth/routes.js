import { conn } from "../db/conn";
import Product from '../db/schema';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const db = await conn();
      const products = await Product.find();
      res.status(200).json({ success: true, products });
    } catch (err) {
      console.error("Error retrieving products:", err);
      res.status(500).json({ error: 'Error retrieving products', details: err.message });
    }
  } else if (req.method === "POST") {
    try {
      console.log("POST Route")
      console.log(req.body)
      const { name, description, price } = req.body;
      const imagePath = ""; 
      const db = await conn();
      const newProduct = new Product({ name, description, price, imagePath });
      await newProduct.save();
      res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
      console.error("Error creating product:", err);
      res.status(500).json({ error: 'Error creating product', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
