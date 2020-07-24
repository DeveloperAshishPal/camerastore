let DBHelper = require('../core/db/functions');

exports.listProducts = function (conn,query) {
    var productQuery = `select * from product where is_active = 1`;
    return DBHelper.runSqlQuery(conn, productQuery);
};