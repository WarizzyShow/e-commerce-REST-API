const Router = require('express');
const router = Router();
const UserController = require('../controller/userController')

// Signup
router.post('/users/login', UserController.Signup);
router.post('/users/logout', UserController.logout );
router.post('/users/logoutAll', UserController.logoutAll);
router.post('/update/:id', UserController.updateUser);

module.exports = router;