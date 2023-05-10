const Cart=require('../models/cart');
const Product=require('../models/product');
const User=require('../models/user');
const cartIem=require('../models/cart-item');

module.exports.getProductList=(req,res,next)=>{
    Product.findAll()
    .then(products=>{
        res.render('./shop/All-product-list',{
            products,
            hasProducts:products.length>0
        });
    })
    
}

module.exports.postAddToCart=(req,res,next)=>{
    const myproductId=req.body.id;
    let myCart;
    req.user
    .getCart()
    .then(cart=>{
        myCart=cart;
        return cart.getProducts({
            where:{
                id:myproductId
            }
        });
    })
    .then(products=>{
        if(products.length>0){
            let product=products[0];
            let q=product.cartItem.dataValues.quantity+1;
            myCart.addProduct(product,{through:{quantity:q}})
            res.redirect('/');
        }
        else{
            let q=1;
            return Product.findByPk(myproductId)
            .then(product=>{
                myCart.addProduct(product,{through:{quantity:q}})
                res.redirect('/');
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports.ShowCart=(req,res,next)=>{
    req.user
    .getCart()
    .then((cart)=>{
        cart.getProducts()
        .then(products=>{
            for(let i=0;i<products.length;i++)  products[i].qty=products[i].dataValues.cartItem.quantity;  
            res.render('./shop/cart',{
                products,
                hasProducts:products.length>0
            })
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports.postDeleteFormCart=(req,res,next)=>{
    let productId=req.body.id;
    console.log("My Product is"+productId)
    req.user.getCart()
    .then(cart=>{
       return Product.findByPk(req.body.id)
        .then(myProduct=>{
            return cart.removeProduct(myProduct);
        })
       
        .then(()=>{
            res.redirect("/Show-Cart");
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch(err=>{
            console.log(err);
        })
}
module.exports.showTotalBill=(req,res,next)=>{
    req.user
    .getCart()
    .then((cart)=>{
        let totalPrice=0;
        cart.getProducts()
        .then(products=>{
            for(let i=0;i<products.length;i++){
                products[i].qty=products[i].dataValues.cartItem.quantity;  
                totalPrice+=products[i].price*products[i].qty;
            }  
            res.render('./shop/TotalBill',{
                products,
                totalPrice,
                hasProducts:products.length>0
            })
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports.postSelectedProduct=(req,res,next)=>{
    console.log(req.query.id);
    Product.findByPk(req.query.id)
    .then(product=>{
        
        res.render('./shop/Single-Product',{
            product
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}