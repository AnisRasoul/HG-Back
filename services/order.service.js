const Order = require('../models/Order');
const User = require('../models/User'); // Import the User model
const Product = require('../models/Product');

exports.createOrderFn = (data) => {
    return Order.create({
        user: data.user,
        products: data.products,
        totalPrice: data.totalPrice,
        status: data.status,
        updated_at: Date.now(), 
    })
}

exports.findAll = () => {
    return Order.find()
        .populate({
            path: 'user',
            model: 'User',
            select: 'username email' 
        })  
        .populate({
            path: 'products.product',  // Specify the path for nested population
            model: 'Product',
            select : 'title category price -_id'        // Reference the Product model
        });
};
exports.findUserOrders = (id) => {
    return Order.find({ user: id })
    .populate({
        path: 'products.product',
        model: 'Product',
        select : 'title category price images.front_view -_id created_at'
    })
};

exports.updateOrderFn = (id, data) => {
    return Order.findByIdAndUpdate(id, {
        user: data.user,
        products: data.products,
        totalPrice: data.totalPrice,
        status: data.status,
        updated_at: Date.now(),
    }, { new: true });
};

exports.findById = (id) => {
    return Order.findById(id);
};

exports.findByDate = (year, month, day) => {
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    return Order.find({
        created_at: {
            $gte: date,
            $lt: new Date(date.getTime() + 60 * 60 * 24 * 1000),
        },
    });
};

exports.deleteOrderFn = (id) => {
    return Order.deleteOne({ _id: id });
};
