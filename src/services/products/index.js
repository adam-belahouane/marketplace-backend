import express from "express";
import {
  getProducts,
  getReviews,
  writeProductsToFile,
  saveImages,
} from "../../lib/functions.js";
import multer from "multer";


import productHandlers from "./handlers.js";
import reviews from "../reviews/handlers.js"
const productsRouter = express.Router();


productsRouter.post("/", productHandlers.createProduct);

productsRouter.post(
  "/:id/upload",
  multer().single("image"),
  async (req, res, next) => {
    try {
      if (req.file) {
        console.log(req.file);
        console.log("This is the id: ", req.params.id);
        const newFileName = req.params.id + req.file.originalname;
        await saveImages(newFileName, req.file.buffer);
        const products = await getProducts();
        const index = await products.findIndex(
          (prod) => prod._id === req.params.id
        );
        let fileLinkDeclaration = "";
        if (index !== -1) {
          const productPreEdit = products[index];
          const editedProduct = {
            ...products[index],
            cover: `http://localhost:3001/images/${newFileName}`,
          };

          products[index] = editedProduct;

          await writeProductsToFile(products);
          console.log("this is the product pre edit", productPreEdit);
          console.log("this is the product post-edit", editedProduct);
          console.log("These are the products", products);
          console.log("Here is the index", index);

          fileLinkDeclaration = "file uploaded and connection made to product";
          res.status(200).send(fileLinkDeclaration);
        } else {
          res.status(404).send("not found");
        }
      } else {
        next(createHttpError(400));
      }
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.get("/", productHandlers.getAll);

productsRouter.route("/:id")
.get(productHandlers.getProductById)
.put(productHandlers.editProductById)
.delete(productHandlers.deleteProductById)

productsRouter.route("/:id/reviews")
.get(reviews.getReviews)
.post(reviews.createReview)

productsRouter.route("/:id/reviews/:reviewId")
.put(reviews.editReviewById)
.delete(reviews.deleteReviewById)

export default productsRouter;
