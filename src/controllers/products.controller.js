const Product = require('../models/product.model')

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

const getById = async (req, res) => {
    const { idProduct } = req.params;

    const product = await Product.findById(idProduct);
    res.json(product);
}

const postProduct = async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
}

const updateProduct = async (req, res) => {
    const { idProduct } = req.params;

    //Para actualizar hay que añadir un objeto como tercer parámetro a la función tal como se especifica abajo
    const updatedProduct = await Product.findByIdAndUpdate(idProduct, req.body, { new: true });
    res.json(updatedProduct);

}

const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(idProduct);
    res.json(deletedProduct);
}

module.exports = {
    getProducts, postProduct, getById, updateProduct, deleteProduct
}