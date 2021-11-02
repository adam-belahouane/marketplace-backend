import pool from "../../db/connect.js";

const getAll = async (_req, res, _next) => {
    try {
      const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
      res.send(data.rows);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const createProduct = async (req, res, next) => {
      try {
          const { name, description, brand, imageUrl, price, category} = req.body
          const data = await pool.query(
              "INSERT INTO products(name, description, brand, imageUrl, price, category) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;",
              [name, description, brand, imageUrl, price, category]
          )

          res.send(data.rows[0])
      } catch (error) {
          next(error)
      }
  }

  const productHandlers = {
      createProduct
  }

  export default productHandlers