const Router = require('express');
const router = Router();
const authController = require('../controller/authController')


//  register API
 router.post('/register', authController.Register)

// Login API
router.post('/login', authController.Login );
// update user
router.post('/user/:id', authController.updateUser);

module.exports = router ;