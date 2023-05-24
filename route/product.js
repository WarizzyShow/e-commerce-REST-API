const Router = require('express');
const router = Router();
const Auth = require('../middleware/auth');
const productController = require('../controller/productController')

// create new product
router.post('/items',Auth, productController.newProduct)


//  get all product API with search
router.get('/items', productController.ProductSearch )

//update an item

router.patch('/product/:id', productController.UpdateItem)


// delete an item
router.delete('/items/:id', Auth, productController.deletedItem)
module.exports = router