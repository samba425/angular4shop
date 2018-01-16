const express = require('express'),
    router = express.Router(),
    productsController = require('./controller');


router
    .route('/products')
    .get(productsController.getProducts)
    .post(productsController.addProducts)
    .put(productsController.updateProducts)
    .delete(productsController.deleteProduct);


    router
    .route('/shoppingCart')
     .post(productsController.shoppingCart);
 router
    .route('/shoppingCart/:id')
     .get(productsController.getCarts);
     
router
    .route('/shoppingCart/:id/:productid')
    .get(productsController.getCart)
    
     .patch(productsController.updateProducts)
    // .delete(productsController.makeInactive)

    router
    .route('/shoppingCart/:id/:productid') 
     .post(productsController.updateProducts)

         router
    .route('/removeshoppingCart/:id/:productid') 
     .post(productsController.deleteProduct)

     	router
    .route('/addshoppingCart/:id/:productid') 
     .post(productsController.addProducts) 


router
    .route('/productsChangeActive')
    .put(productsController.updateProductActive);


module.exports = router;