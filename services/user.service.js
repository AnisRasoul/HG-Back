const User = require('../models/User')
const bcrypt = require('bcrypt')
const lodash = require("lodash");
exports.createUser = async (data) => {
    const user = await User.create(data);
    return lodash.omit(user.toJSON(),'password')
};
exports.findUser = (data) => {
    return User.findOne(data)
};
exports.findAllUser = () => {
    return User.find();
  };

exports.validatePassword = async ({ email, password}) => {
    const user = await User.findOne({email})
    if(!user) return false;
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return false;
    return lodash.omit(user.toJSON(),'password');
}

exports.deleteUser = (id) => {
    return User.deleteOne({_id: id}) ;
};

exports.updateUser = (id, data) => {
    return User.findByIdAndUpdate(id, data)
}