const Router = require('express');
const router = Router();
const Auth = require('../middleware/auth');
const cartContoller = require('../controller/cartController')


// get cat item 

router.get("/cart", Auth, cartContoller.GetCart);

//create cart
router.post("/cart", Auth, cartContoller.createCart )

     
//  delete item in a cart
router.delete("/cart/", Auth, cartContoller.DeleteCart );

module.exports = router;