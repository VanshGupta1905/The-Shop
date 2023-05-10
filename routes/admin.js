 const express=require('express');
 const route=express.Router();
const adminController=require('../controllers/admin');


route.get('/',adminController.getProductList);
route.post('/addProduct',adminController.postAddProduct);
route.post('/delete-product',adminController.postDeleteProduct);
route.get('/addProduct',adminController.getAddProduct);
route.post('/update-product-form',adminController.getUpdateProduct);
route.post('/update-product',adminController.postUpdateProduct);
 module.exports=route;