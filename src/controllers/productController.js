import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

import { createSyncEvent } from "../services/syncEventService.js";

const SERVICE_NAME = process.env.SERVICE_NAME;
const TARGET_SERVICE = SERVICE_NAME === "web1" ? "web2" : "web1";

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
      // 1. CRUD DB chính
      const newProduct = await createProduct(req.body);

      // 2. Ghi event DB3
      await createSyncEvent({
        sourceService: SERVICE_NAME,
        targetService: TARGET_SERVICE,
        entity: "products",
        recordId: newProduct.id,
        action: "INSERT",
        payload: newProduct,
      });

      // 3. Realtime UI
      req.io.emit("product_updated");

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await updateProduct(req.params.id, req.body);

      await createSyncEvent({
        sourceService: SERVICE_NAME,
        targetService: TARGET_SERVICE,
        entity: "products",
        recordId: req.params.id,
        action: "UPDATE",
        payload: req.body,
      });

      req.io.emit("product_updated");
      res.json({ message: "Updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await deleteProduct(req.params.id);

      await createSyncEvent({
        sourceService: SERVICE_NAME,
        targetService: TARGET_SERVICE,
        entity: "products",
        recordId: req.params.id,
        action: "DELETE",
        payload: null,
      });

      req.io.emit("product_updated");
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
