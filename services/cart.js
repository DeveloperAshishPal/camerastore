let cartController = require('../controllers/Cart');
let mysql = require('../config/mysql');
let conn = mysql.mysqlConnection();

exports.getUserCart = function (id){
    return cartController.getUserCart(conn,id);
}

exports.addToCart = function (cartData,userId){
    return cartController.addToCart(conn,cartData,userId);
}

