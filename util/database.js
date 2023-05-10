const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    'travel_planner'
    ,'root'
    ,'SuitAndTie@1905',{
        host:'localhost',
        dialect:'mysql',
});
module.exports = sequelize;