const sequelize = require('../util/database');
const db=require('sequelize');

const cartItem=sequelize.define('cartItem',{
    id:{
        type:db.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    quantity:{
        type:db.INTEGER,
        allowNull:false
    }
})
module.exports = cartItem;