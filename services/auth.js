let authController = require('../controllers/Auth');
let mysql = require('../config/mysql');
let conn = mysql.mysqlConnection();

exports.login = function(body){
	return authController.login(conn,body);
}

