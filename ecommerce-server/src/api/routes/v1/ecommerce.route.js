const express = require('express');
const controller = require('../../controllers/ecommerce.controller');
const router = express.Router();

router
  .route('/categories/:key')
  .get(controller.getCategories)

router
  .route('/brands/:key')
  .get(controller.getBrands)

router
  .route('/getByCategory')
  .post(controller.getProductsByCategory)

router
  .route('/getByBrand')
  .post(controller.getProductsByBrand)

router
  .route('/oneProduct/:productId')
  .get(controller.getOneProduct)

router
  .route('/addToCart')
  .post(controller.addToCart)

router
  .route('/')
  .get(controller.getAllProducts)

router
  .route('/getCartByUser/:username')
  .get(controller.getCartByUser)

router
  .route('/deleteCart/:orderId')
  .delete(controller.deleteCart)

router
  .route('/changeCount/:key/:orderId')
  .get(controller.changeCount)

router
  .route('/relativeProduct/:productId/:category')
  .get(controller.getRelativeProducts)


module.exports = router;
