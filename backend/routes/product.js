const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

router.get("/", productController.getProducts);
router.post("/", auth, productController.createProduct);
router.delete("/:id", auth, productController.deleteProduct);

module.exports = router;
