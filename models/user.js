const sequelize=require('../util/database');
const db = require('sequelize');

const User =sequelize.define("users",{
    id:{
        type:db.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type:db.STRING,
        allowNull:false
    }
})
module.exports =User;