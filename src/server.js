import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import productsRouter from "./services/products/index.js";
import reviewsRouter from "./services/reviews/index.js";
import { join } from "path";
import createTables from "./db/create-tables.js";

const server = express();

server.use(cors("*"));
server.use(express.json());

const publicFolderPath = join(process.cwd(), "public");


server.use(express.static(publicFolderPath));
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);

const { PORT } = process.env

console.table(listEndpoints(server));

server.listen(PORT, async () => {
    console.log("server on port:", PORT);
    await createTables()
  });