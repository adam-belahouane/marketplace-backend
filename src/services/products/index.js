import express from "express";
import addimage from "../lib/imghandler.js";
import productHandlers from "./handlers.js";
import reviews from "../reviews/handlers.js"
const productsRouter = express.Router();


productsRouter.post("/", productHandlers.createProduct);
productsRouter.get("/", productHandlers.getAll);

productsRouter.route("/:id")
.get(productHandlers.getProductById)
.put(productHandlers.editProductById)
.delete(productHandlers.deleteProductById)

productsRouter.post("/:id/image", addimage, productHandlers.updateProductImage)

productsRouter.route("/:id/reviews")
.get(reviews.getReviews)
.post(reviews.createReview)

productsRouter.route("/:id/reviews/:reviewId")
.put(reviews.editReviewById)
.delete(reviews.deleteReviewById)

export default productsRouter;
