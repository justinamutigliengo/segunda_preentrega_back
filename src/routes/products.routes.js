import { Router } from "express";
import ProductManager from "../dao/db/products.manager.mdb.js";

const router = Router();

const manager = new ProductManager();

// Esto es con FileSystem
// import ProductManager from "../dao/FileSystem/ProductManager.js";
// const manager = new ProductManager("../src/mocks/products.json");

router.get("/", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const result = await manager.getProducts({ limit, page, sort, query });

    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .send({ status: "error", error: "Error interno del servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const product = await manager.getProductById(req.params.pid);

    if (!product) {
      res.status(404).send({ error: "Producto no encontrado" });
    } else {
      res.status(200).send({ payload: product });
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await manager.addProduct(req.body);
    res.status(200).send({ status: "success", payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const updatedProduct = await manager.updateProduct(req.params, req.body);
    console.log(updatedProduct);
    res.status(200).send({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const deleteProduct = await manager.deleteProduct(req.params);
    res.status(200).send({ status: "success", payload: deleteProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

export default router;
