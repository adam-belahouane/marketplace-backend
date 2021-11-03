import pool from "../../db/connect.js";

const getAll = async (req, res, next) => {
  try {
    const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
    res.send(data.rows);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, description, brand, imageUrl, price, category } = req.body;
    const data = await pool.query(
      "INSERT INTO products(name, description, brand, imageUrl, price, category) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;",
      [name, description, brand, imageUrl, price, category]
    );

    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const data = await pool.query("SELECT * FROM products WHERE id=$1", [
      req.params.id,
    ]);
    if (data.rows.length === 0) {
        res.status(400).send("User not found")
      } else {
        res.send(data.rows[0])
      }
  } catch (error) {
    console.log(error);
  }
};

const editProductById = async (req, res, next) => {
  try {
    const { name, description, brand, imageUrl, price, category } = req.body;
    const data = await pool.query(
      "UPDATE products SET name=$1,description=$2,brand=$3,imageUrl=$4,price=$5,category=$6,updated_at=$7 WHERE id=$8 RETURNING *;",
      [name, description, brand, imageUrl, price, category, new Date, req.params.id]
    );
    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteProductById = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateProductImage = async(req, res, next) => {
  try {
    const image_url = req.file.path;
    const data = await pool.query("UPDATE products SET imageurl=$1 WHERE id=$2 RETURNING *;", [image_url, req.params.id]);
    res.send(data.rows[0])
  } catch (error) {
    next(error)
  }
}

const productHandlers = {
  createProduct,
  getAll,
  getProductById,
  editProductById,
  deleteProductById,
  updateProductImage
};

export default productHandlers;
