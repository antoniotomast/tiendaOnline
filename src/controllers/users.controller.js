const User = require('../models/user.model');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('products');
        res.json(users);
    } catch (error) {
        res.json({ fatal: error.message });
    }

}

const createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
}

const buyProduct = async (req, res) => {
    const { userId, productId } = req.params;

    const user = await User.findById(userId);
    user.products.push(productId);
    await user.save();

    res.json(user);
}

module.exports = {
    createUser, buyProduct, getUsers
}