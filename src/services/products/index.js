import express from "express";
import uniqid from "uniqid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { productValidation  } from "./validation.js";
import { getProducts, getReviews, writeProductsToFile, saveImages } from "../../lib/functions.js";
import multer from "multer";
import { validationResult } from "express-validator";
// import { parseFile, uploadFile } from "../utils/upload/index.js";
import productHandlers from "./handlers.js";
const productsRouter = express.Router();

// Post Product

productsRouter.post("/", productHandlers.createProduct)


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
        const products =  await getProducts();
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



productsRouter.get("/", productHandlers.getAll)



//*BELOW gets all the reviews for a specific product*/


// productsRouter.get("/:id/reviews", async (req, res, next) =>{
//     try{
//       console.log(req)
//       const reviews  = await getReviews()
//       const findReviews = reviews.find(rev => rev.productId === req.params.id)
//       if(findReviews){
//         res.send({findReviews})
//       } else {
//         next(createHttpError(404, `Reviews with the id ${req.params.id} don't exist` ))
//       }
//     }catch(error){
//       next(error)
//     }

//   })




  productsRouter.get("/:id", productHandlers.getProductById)


  
  productsRouter.put("/:id", productHandlers.editProductById)
  
  
  
  
  productsRouter.delete("/:id", productHandlers.deleteUserById)
  

  
  export default productsRouter;
  
// productsRouter.put("/:id", async (req, res, next) => {
//   try {
//     const products = await getProducts();

//     const productIndex = products.findIndex(
//       (product) => product.id === req.params.id
//     );
//     if (!productIndex == -1) {
//       res
//         .status(404)
//         .send({ message: `Product with ${req.params.id} is not found!` });
//     }
//     const previousProductData = products[productIndex];
//     const changedProduct = {
//       ...previousProductData,
//       ...req.body,
//       updatedAt: new Date(),
//       id: req.params.id,
//     };
//     products[productIndex] = changedProduct;
//     writeProductsToFile(products)
//     res.status(200).send(changedProduct);
//   } catch (error) {
//     res.send(500).send({ message: error.message });
//   }
// });

// const parseFile = multer()
// productsRouter.put(
  //   "/:id/avatar",
  //   parseFile.single("avatar"),
  //   uploadFile,
//   async (req, res, next) => {
//     try {
//       const products =  await getProducts();

//     //   const fileAsString = fileAsBuffer.toString();

//     //   let fileAsJSONArray = JSON.parse(fileAsString);

//       const productIndex = products.findIndex(
//         (product) => product.id === req.params.id
//       );
//       if (!productIndex === -1) {
//         res
//           .status(404)
//           .send({ message: `Product with ${req.params.id} is not found!` });
//       }
//       const previousProductData = products[productIndex];
//       const changedProduct = {
//         ...previousProductData,
//         ...req.body,
//         updatedAt: new Date(),
//         id: req.params.id,
//       };
//       products[productIndex] = changedProduct;

//       writeProductsToFile(products)
//       //fs.writeFileSync(productsFilePath, JSON.stringify(fileAsJSONArray));
//       res.status(200).send(changedProduct);
//     } catch (error) {
//       res.status(500).send({ message: error.message });
//     }
//   }
// );