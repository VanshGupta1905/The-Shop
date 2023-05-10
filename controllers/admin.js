const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const cartItem = require("../models/cart-item");

//  Reading
module.exports.getProductList = (req, res, next) => {
  req.user
    .getProducts()
    .then((Products) => {
      
      res.render("./admin/product-list", {
        products: Products,
        hasProducts: Products.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Deleting A Product
module.exports.postDeleteProduct=(req,res,next)=>{
    const productId=req.body.id;
    Product.findByPk(productId)
    .then(product=>{
        product.destroy()
        .then(()=>{
            console.log("Product Removed");
            res.redirect('/admin');
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}
// Creating
module.exports.postAddProduct = (req, res, next) => {
  req.user
    .createProduct({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description,
    })
    .then(() => {
      console.log("Product Created");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/admin");
};
// Opening The Form
module.exports.getAddProduct = (req, res, next) => {
  res.render("./admin/add-product");
};

module.exports.getUpdateProduct=(req,res,next)=>{
    const productId=req.body.id;
    Product.findByPk(productId)
    .then(product=>{
        res.render('./admin/updating-form',{
            product
        });
    })
    
}

module.exports.postUpdateProduct=(req,res,next)=>{
    Product.findByPk(req.body.id)
    .then(product=>{
        product.set({
            name:req.body.name,
            imageUrl:req.body.imageUrl,
            price:req.body.price,
            description:req.body.description
        })
        return product.save();
    })
    .then(()=>{
        console.log("Product Updates");
        res.redirect('/admin');
    })
    .catch((err)=>{
        console.log(err);
    })
}
