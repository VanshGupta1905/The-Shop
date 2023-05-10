const sequelize=require('../util/database');
const db=require('sequelize');

const Comments=sequelize.define('Comments',{
    id:{
        type:db.INTEGER,
        primaryKey:db.INTEGER,
        allowNull:false,
        autoIncrement:true
    },
   review:{
    type:db.STRING,
    allowNull:false
   } 
});

module.exports = Comments;