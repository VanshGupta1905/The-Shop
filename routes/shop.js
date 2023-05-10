const express=require('express');
const route=express.Router();
const shopController=require('../controllers/shop');


route.get('/',shopController.getProductList);
route.post('/add-to-cart',shopController.postAddToCart)
route.get('/Show-Cart',shopController.ShowCart);
route.post('/delete-from-cart',shopController.postDeleteFormCart);
route.get('/show-total',shopController.showTotalBill);
route.get('/show-product',shopController.postSelectedProduct);


module.exports=route;