import { Router } from "express";
import ProductManager from "../products/productManager.js";

const productRouter = Router();
const prod = new ProductManager();

productRouter.post("/", async (req, res) => {
  let newProd = req.body;
  res.send(await prod.addProduct(newProd));
});

productRouter.get("/", async (req, res) => {
  res.send(await prod.getProducts());
});

productRouter.get("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await prod.getProductsById(id));
});

productRouter.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updateProd = req.body;
  res.send(await prod.updateProducts(id, updateProd));
});

productRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await prod.deleteProducts(id));
});

export default productRouter;