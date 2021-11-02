import pool from "../../db/connect.js";

const getAll = async (req, res, next) => {
    try {
      const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
      res.send(data.rows);
    } catch (error) {
      next(error)
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

  const getProductById = async (req, res, next) => {
      try {
          const data = await pool.query("SELECT * FROM products WHERE id=$1", [
              req.params.id
          ])
      } catch (error) {
          next(error)
      }
  }

  const editProductById = async (req, res, next) => {
      try {
        const { name, description, brand, imageUrl, price, category} = req.body
        const data = await pool.query(
            "UPDATE products SET name=$1,description=$2,brand=$3,imageUrl=$4,price=$5,category=$6 WHERE id=$7 RETURNING *;",
            [name, description, brand, imageUrl, price, category, req.params.id]
        )
        res.send(data.rows[0])   
      } catch (error) {
          next(error)
      }
  }

  const deleteUserById = async (req, res, next) => {
    try {
      await pool.query("DELETE FROM product WHERE id=$1", [req.params.id]);
      res.status(204).send();
    } catch (error) {
      next(error)
    }
  };

  const productHandlers = {
      createProduct,
      getAll,
      getProductById,
      editProductById, 
      deleteUserById
    
  }

  export default productHandlers