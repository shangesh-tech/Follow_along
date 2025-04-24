// route
const multer = require("multer");
const upload = multer({ dest: "temp-uploads/" });
const express = require("express");
const {
  createProductController,
  getProductDataController,
  updateProductDataController,
  getSingleProductDocumentController,
  deleteSingleProduct,
} = require("../Controllers/product.controller.js");
const { verifyUserController } = require("../Controllers/user.controller.js");
const router = express.Router();

router.post(
  "/createproduct",
  upload.array("files", 5),
  verifyUserController,
  createProductController
);

router.get("/getproducts", getProductDataController);

router.put(
  "/updateproducts/:id",
  upload.array("files", 5),
  updateProductDataController
);

router.get("/getproducts", getProductDataController);

router.get("/getsingle/:id", getSingleProductDocumentController);
router.delete("/:id", deleteSingleProduct);

module.exports = router;
