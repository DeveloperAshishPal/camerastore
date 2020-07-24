let productController = require('../controllers/Product');
let mysql = require('../config/mysql');
let conn = mysql.mysqlConnection();

exports.productList = function (query = {}){
        return productController.listProducts(conn,query);
}
