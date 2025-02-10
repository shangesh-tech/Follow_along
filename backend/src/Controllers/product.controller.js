const multer = require("multer");
const cloudinary = require("../utilities/cloudinary.js");
const fs = require("fs");
const ProductModel = require("../Model/Product.model.js");
const { createHashRouter } = require("react-router-dom");

const createProductController = async (req, res) => {
  const {
    title,
    description,
    rating,
    discountedPrice,
    originalPrice,
    quantity,
    category,
  } = req.body;

  try {
    const arrayImage = req.files.map(async (singleFile, index) => {
      return cloudinary.uploader
        .upload(singleFile.path, {
          folder: "uploads",
        })
        .then((result) => {
          fs.unlinkSync(singleFile.path);
          return result.url;
        });
    });

    const dataImages = await Promise.all(arrayImage);
    const StoreProductDetails = await ProductModel.create({
      title,
      description,
      rating,
      discountedPrice,
      originalPrice,
      quantity,
      category,
      images: dataImages,
      userEmail: req.userEmailAddress,
    });
    return res.status(201).send({
      message: "Image Successfully Uploaded",
      success: true,
      dataImages,
      StoreProductDetails,
    });
  } catch (er) {
    if (er instanceof multer.MulterError) {
      return res.status(400).send({
        message: "Multer error please send image less than 5 ",
        success: false,
      });
    }

    return res.status(500).send({ message: er.message, success: false });
  }
};

const getProductDataController = async (req, res) => {
  try {
    const data = await ProductModel.find();
    return res
      .status(200)
      .send({ data, message: "Data fetched successfully", success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

const updateProductController = async (req, res) => {
  const {
    title,
    description,
    rating,
    discountedPrice,
    originalPrice,
    quantity,
    category,
  } = req.body;
  const { id } = req.params;

  try {
    const checkIfProductExist = await ProductModel.findOne(id);

    if (!checkIfProductExist) {
      return res.status(404).send({ message: "product not found" });
    }

    const imageArray = req.files.map((singleFile, index) => {
      return cloudinary.uploader
        .upload(singleFile.path, {
          folder: "uploads",
        })
        .then((result) => {
          fs.unlinkSync(singleFile.path);
          return result.url;
        });
    });

    const imageData = await Promise.all(imageArray);

    const findAndUpdate = await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        rating,
        discountedPrice,
        originalPrice,
        quantity,
        category,
        images: imageData,
      },
      {
        new: true,
      }
    );

    return res.status(201).send({
      message: "Document updated successfully",
      success: true,
      updatedResult: findAndUpdate,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

const getSingleProductDocumentController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProductModel.findOne({ _id: id });

    if (!data) {
      return res.status(404).send({ message: "Product Not found" });
    }

    return res
      .status(200)
      .send({ message: "Product fetched ", data, success: true });
  } catch (err) {
    return re.status(500).send({ message: err.message, success: false });
  }
};

const deleteSingleProductController = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await ProductModel.findOne({ _id: id });

    if (!data) {
      return res.status(404).send({ message: "Product Not found" });
    }

    await ProductModel.findByIdAndDelete({ _id: id });

    const newData = await ProductModel.find();

    return res.status(200).send({
      message: "product successfully fetched",
      data: newData,
      success: true,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message, success: false });
  }
};

module.exports = {
  createProductController,
  getProductDataController,
  updateProductController,
  getSingleProductDocumentController,
  deleteSingleProductController,
};
