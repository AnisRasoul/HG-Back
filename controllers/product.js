const {
  findAllCategories,
  createCategoryFn,
  createProductFn,
  updateProductFn,
  findAllProducts,
  deleteCategoryFn,
  deleteProductFn,
  findCategoryById,
} = require("../services/product.service");
const Product = require('../models/Product')
const cloudinary = require('../util/cloudinary');

exports.createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryFn(req.body);
    if (!category)
      return res.status(400).json({ message: "Failed to add category" });
    return res.status(200).json({ message: "Category created successfully", category });
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await findAllCategories();
    if (!allCategories)
      return res.status(400).json({ message: "Failed to get categories" });
    return res.status(200).json({ message: "Categories retrieved successfully", allCategories });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await deleteCategoryFn(req.params.id);
    if (category.deletedCount === 1)
      return res.status(200).json({ message: "Category deleted successfully" });
    if (category.deletedCount === 0)
      return res.status(400).json({ message: "Category has not been deleted" });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await createProductFn(req.body);
    if (!product)
      return res.status(400).json({ message: "Failed to add product" });
    return res.status(200).json({ message: "Product created successfully", product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await updateProductFn(req.params.id, req.body);
    if (!product)
      return res.status(400).json({ message: "Failed to update product" });
    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    next(err);
  }
};
exports.getProductsByCategory = async (req, res, next) => {
  try {
      const category = req.params.category;
      const products = await Product.find({ category: category });

      if (!products || products.length === 0) {
          return res.status(404).json({ message: "No products found for the specified category" });
      }

      return res.status(200).json(products);
  } catch (error) {
      next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await findAllProducts();
    if (!allProducts)
      return res.status(400).json({ message: "Failed to get products" });
    return res.status(200).json({ message: "Products retrieved successfully", allProducts });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await (req.params.id);
    if (!product)
      return res.status(400).json({ message: "Failed to get product" });
    return res.status(200).json({ message: "Product retrieved successfully", product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await deleteProductFn(req.params.id);
    if (product.deletedCount === 1)
      return res.status(200).json({ message: "Product deleted successfully" });
    if (product.deletedCount === 0)
      return res.status(400).json({ message: "Product has not been deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getProductsSpecificCategory = async (req, res, next) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (!category)
      return res.status(400).json({ message: "Failed to get category" });
    const allProducts = await findAllProducts();
    if (!allProducts)
      return res.status(400).json({ message: "Failed to get products" });
    const products = allProducts.filter(
      (product) => product.category === category.title
    );
    return res.status(200).json({ message: "Products for category retrieved successfully", products });
  } catch (err) {
    next(err);
  }
};
exports.uploadProductImages = async (req, res) => {
  try {
      const files = req.files;  
      const uploadResults = [];

      for (let i = 0; i < files.length; i++) {
          const result = await cloudinary.uploader.upload(files[i].path, {
              transformation: [{ format: 'webp', quality: 'auto' }],
          });
          uploadResults.push(result);
      }

      return res.status(200).json({
          message: "Images uploaded successfully",
          uploadResults
      });
  } catch (err) {
      console.error('Error uploading images:', err);
      return res.status(400).json({
          message: "Image upload failed",
          err
      });
  }
};


