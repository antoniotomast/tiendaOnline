const router = require('express').Router();

const productsController = require('../../controllers/products.controller');

router.get('/', productsController.getProducts);
router.get('/:idProduct', productsController.getById);
router.post('/', productsController.postProduct);
router.put('/:idProduct', productsController.updateProduct);
router.delete('/:idProduct', productsController.deleteProduct);


module.exports = router;





