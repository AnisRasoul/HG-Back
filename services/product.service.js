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
exports.findProductById = (id) => {
    return Product.findById(id);
};
exports.deleteCategoryFn = (id) => {
    return Category.deleteOne({ _id: id})
}
// product
exports.createProductFn = (data) => {
    return Product.create({ 
        title: data.title,
        description: data.description,
        images: { 
            front_view: data.images.front_view,
            back_view: data.images.back_view,
            detail_images: data.images.detail_images || []
        },
        category: data.category,
        price: data.price,
    });
};

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

exports.deleteProductFn = (id) => {
    return Product.deleteOne({ _id: id})
}



