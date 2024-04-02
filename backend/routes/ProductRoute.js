const express = require("express");
const {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/Products");
const { verifyUser } = require("../middleware/authUser");
const router = express.Router();

router.get("/products", verifyUser, getProducts);
router.get("/products/:id", verifyUser, getProductsById);
router.post("/products", verifyUser, createProduct);
router.patch("/products/update/:id", verifyUser, updateProduct)
router.delete("/products/delete/:id", verifyUser, deleteProduct)

module.exports = router;
