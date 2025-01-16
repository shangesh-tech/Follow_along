const multer = require('multer');
const cloudinary = require('../utils/cloudinary.js');
const fs = require('fs');
const ProductModel = require('../model/Product.model.js');

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
            folder: 'uploads',
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
      });
      return res.status(201).send({
        message: 'Image Successfully Uploaded',
        sucess: true,
        dataImages,
        StoreProductDetails,
      });
    } catch (er) {
      if (er instanceof multer.MulterError) {
        return res.status(400).send({
          message: 'Multer error plese send image less than 5 ',
          success: false,
        });
      }
      console.log(er);
      return res.status(500).send({ message: er.message, success: false });
    }
  };

const getProductDataController = async (req, res) => {
  try{
    const data = await ProductModel.find();
    return res
      .status(200)
      .send({ data, message: 'Product Data Retrieved Successfully', success: true });
  } catch(er){

    return res.status(500).send({message:er.message, success: false})
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
    xyz,
    abc,
  } = req.body;
  const { id } = req.params;

  try {
    const checkIfProductExists = await ProductModel.findOne({ _id: id });
    
    if (!checkIfProductExists) {
      return res.status(404).send({ message: 'Product Not Found' });
    }

    const arrayImage = req.files.map(async (singleFile, index) => {
      return cloudinary.uploader
        .upload(singleFile.path, {
          folder: 'uploads',
        })
        .then((result) => {
          fs.unlinkSync(singleFile.path);
          return result.url;
        });
    });
    const Imagedata = await Promise.all(arrayImage);

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
        images: Imagedata,
      },
      {
        new: true,
      }
    );

    return res.status(201).send({
      message: 'Document Updated Successfully',
      success: true,
      UpdatedResult: findAndUpdate,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

const getSinglePRoductDocumentController = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ProductModel.findOne({ _id: id });
    console.log(data);
    if (!data) {
      return res.status(404).send({ Message: 'Product Not Found' });
    }

    return res
      .status(200)
      .send({ message: 'Product Successfully fetched', data, success: true });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};

const deleteSingleProduct = async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  try {
    const data = await ProductModel.findOne({ _id: id });
    console.log(data);
    if (!data) {
      return res.status(404).send({ Message: 'Product Not Found' });
    }

    await ProductModel.findByIdAndDelete({ _id: id });
    const newData = await ProductModel.find();
    return res.status(200).send({
      message: 'Product Successfully fetched',
      data: newData,
      success: true,
    });
  } catch (er) {
    return res.status(500).send({ message: er.message, success: false });
  }
};


  // controller
  module.exports = { 
    createProductController, 
    getProductDataController,
    updateProductController,
    getSinglePRoductDocumentController,
    deleteSingleProduct,
  };