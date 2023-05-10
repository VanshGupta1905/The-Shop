const sequelize=require('../util/database');
const db = require('sequelize');

const Products=sequelize.define('products',{
    id:{
        type:db.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:db.STRING,
        allowNull:false
    },
    price:{
        type:db.DOUBLE,
        allowNull:false
    },
    description:{
        type:db.STRING,
        allowNull:false
    },
    imageUrl:{
        type:db.STRING,
        allowNull:false
    }

})
module.exports = Products;