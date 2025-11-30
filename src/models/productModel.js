import { pool } from "../config/db.js";

export async function getAllProducts() {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
}

export async function createProduct({ name, price }) {
  const [result] = await pool.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price]
  );
  return { id: result.insertId, name, price };
}

export async function updateProduct(id, { name, price }) {
  await pool.query("UPDATE products SET name=?, price=? WHERE id=?", [
    name,
    price,
    id,
  ]);
}

export async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE id=?", [id]);
}
