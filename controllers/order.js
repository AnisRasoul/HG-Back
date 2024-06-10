const {findAll, updateOrderFn, findById, findByDate, deleteOrderFn, createOrderFn} = require('../services/order.service')


exports.createOrder = async (req,res,next) => {
    try {
       const order = await createOrderFn(req.body) ;
       if(!order) {
        return res.status(400).json({message:"failed to add order"})
       }
       return res.status(200).json({message:"order added successfully"})
    } catch (error) {
        next(error)
    }
}

exports.updateOrder = async (req,res,next) => {
    try {
       const order = await updateOrderFn(req.params.id, req.body) ;
       if(!order) {
        return res.status(400).json({message:"failed to update order"})
       }
       return res.status(200).json({message:"order updated successfully"})
    } catch (error) {
        next(error)
    }
}
exports.deleteOrder = async (req,res,next) => {
    try {
        const order = await deleteOrderFn(req.params.id);
        if (order.deletedCount === 1)
          return res.status(200).json({ message: "order deleted successfully" });
        if (order.deletedCount === 0)
          return res.status(400).json({ message: "order has not been deleted" });
      } catch (err) {
        next(err);
      }
}

exports.getAllOrders = async (req,res,next) => {
    try {
        const allOrders = await findAll()
        if(!allOrders)
            return res.status(400).json({message:'failed to get orders'});
        return res.status(200).json(allOrders)
    } catch (error) {
        next(error)
    }
}

exports.getOrderById = async (rea,res,next) => {
    try {
        const order = await findById(req.params.id)
        if(!order)
            return res.status(400).json({message:'failed to get order'});
        return res.status(200).json({message:'Order retrieved successfully'})
   
    } catch (error) {
        next(error)
    }
}