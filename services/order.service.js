const Order = require('../models/Order');

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
    return Order.find();
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
