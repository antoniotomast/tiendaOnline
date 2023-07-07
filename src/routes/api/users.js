const router = require('express').Router();

const usersController = require('../../controllers/users.controller');

router.get('/', usersController.getUsers);
router.post('/register', usersController.createUser);
router.put('/:userId/buy/:productId', usersController.buyProduct);

module.exports = router;