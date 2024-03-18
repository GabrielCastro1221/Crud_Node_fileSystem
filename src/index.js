import express from "express";
import Router from "./router/products.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", Router);

app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});
