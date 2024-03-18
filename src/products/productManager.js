import { promises as fs } from "fs";
import { nanoid } from "nanoid";

class ProductManager {
  constructor() {
    this.path = "./src/models/productos.json";
  }

  readProduct = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  writeProduct = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  productExist = async (id) => {
    let products = await this.readProduct();
    return products.find((prod) => prod.id === id);
  };

  addProduct = async (product) => {
    let readFile = await this.readProduct();
    product.id = nanoid();
    let all = [...readFile, product];
    await this.writeProduct(all);
    return "Producto agregado";
  };

  getProducts = async () => {
    let readFile = await this.readProduct();
    return readFile;
  };

  getProductsById = async (id) => {
    let prodID = await this.productExist(id);
    if (!prodID) return "Producto no encontrado";
    return prodID;
  };

  updateProducts = async (id, product) => {
    let prodID = await this.productExist(id);
    if (!prodID) return "Producto no encontrado";
    await this.deleteProducts(id);
    let prod = await this.readProduct();
    let products = [{ ...product, id: id }, ...prod];
    await this.writeProduct(products);
    return "Producto actualizado exitosamente";
  };

  deleteProducts = async (id) => {
    let products = await this.readProduct();
    let exist = products.some((prod) => prod.id === id);
    if (exist) {
      let ProdID = products.filter((prod) => prod.id !== id);
      await this.writeProduct(ProdID);
      return "Producto eliminado";
    } else {
      return "El producto no existe";
    }
  };
}

export default ProductManager;
