const sequelize = require("../util/database");
const db = require("sequelize");

const Cart = sequelize.define("Cart", {
  id: {
    type:db.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
});
module.exports=Cart;