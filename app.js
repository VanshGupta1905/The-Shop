const express = require("express");
const app = express();
const port = 4442;
const path = require("path");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
app.use(express.static(path.join(__dirname, "public")));
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));
const sequelize = require("./util/database");

const Cart=require("./models/cart");
const cartItem=require("./models/cart-item");
const User = require("./models/user");
const products = require("./models/product");
const Comments=require('./models/comments');


User.hasOne(Cart);
Cart.belongsTo(User);
User.hasMany(products, { onDelete: "Cascade" });
products.belongsTo(User);
products.belongsToMany(Cart,{through:'cartItem'});
products.hasMany(Comments, { onDelete: "Cascade" });
User.hasMany(Comments, { onDelete: "Cascade" });
Cart.belongsToMany(products,{through:'cartItem'});
Comments.belongsTo(products);
Comments.belongsTo(User);

app.use((req,res,next)=>{
  User.findByPk(1)
   .then((user)=>{
      req.user = user;
      user.getCart()
      .then(myCart => {
        if(!myCart){
          user.createCart( );
        }
      })
      next();
    })
    .catch((error)=>{
      console.log(error);
      next();
    })
  })

app.use('/admin',adminRoute);
app.use('/',shopRoute);



sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

