import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

export const productController = {
  async getAll(req, res) {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newProduct = await createProduct(req.body);
      req.io.emit("product_updated"); // phát sự kiện realtime
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await updateProduct(req.params.id, req.body);
      req.io.emit("product_updated");
      res.json({ message: "Updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await deleteProduct(req.params.id);
      req.io.emit("product_updated");
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
