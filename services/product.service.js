const Category = require('../models/Category')
const Product = require('../models/Product')
// category
exports.createCategoryFn = (data) => {
    return Category.create({title: data.title})
}
exports.findAllCategories = () => {
    return Category.find()
}
exports.findCategoryById = (id) => {
    return Category.findById(id);
  };
exports.deleteCategoryFn = (id) => {
    return Category.deleteOne({ _id: id})
}
// product
exports.createProductFn = (data) => {
    return Product.create({ 
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
        price: data.price,})
}
exports.updateProductFn = (id,data) => {
    return Product.findByIdAndUpdate(id,{ 
        title: data.title,
        description: data.description,
        image: data.image,
        category: data.category,
        price: data.price,
        updated_at: Date.now(),
    })
}
exports.findAllProducts = () => {
    return Product.find()
}
exports.findProductById = (id) => {
    return Product.findbyId(id)
}
exports.deleteProductFn = (id) => {
    return Product.deleteOne({ _id: id})
}



