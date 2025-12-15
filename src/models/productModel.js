import { poolApp } from "../config/db.js";

export async function getAllProducts() {
  const [rows] = await poolApp.query("SELECT * FROM products");
  return rows;
}

export async function createProduct({ name, price }) {
  const [result] = await poolApp.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price]
  );

  return { id: result.insertId, name, price };
}

export async function updateProduct(id, { name, price }) {
  await poolApp.query(
    "UPDATE products SET name=?, price=? WHERE id=?",
    [name, price, id]
  );
}

export async function deleteProduct(id) {
  await poolApp.query(
    "DELETE FROM products WHERE id=?",
    [id]
  );
}
