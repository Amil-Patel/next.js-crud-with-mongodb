import { conn } from "../db/conn";
import Product from '../db/schema';

export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic ID from the URL parameter


    if (req.method === "GET") {
        try {
          const db = await conn();
          const products = await Product.findById(id);
          res.status(200).json(products);
        } catch (err) {
          console.error("Error retrieving products:", err);
          res.status(500).json({ error: 'Error retrieving products', details: err.message });
        }
    }


    else if (req.method === "DELETE") {
        try {
          const db = await conn();
          const products = await Product.findByIdAndDelete(id);
          res.status(200).json({ success: true });
        } catch (err) {
          console.error("Error retrieving products:", err);
          res.status(500).json({ error: 'Error retrieving products', details: err.message });
        }
    }

    else if (req.method === "PATCH") {
        try {
            const { name, description, price } = req.body;
          const db = await conn();
          const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price },
            { new: true }
          );

          res.status(200).json({ success: true });
        } catch (err) {
          console.error("Error retrieving products:", err);
          res.status(500).json({ error: 'Error retrieving products', details: err.message });
        }
    }

    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
