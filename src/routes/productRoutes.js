import express from "express";
import { productController } from "../controllers/productController.js"; // ✅ đổi lại import

const router = express.Router();

// ✅ sử dụng đúng các hàm trong object productController
router.get("/", productController.getAll);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
