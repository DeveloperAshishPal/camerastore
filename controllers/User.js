let DBHelper = require('../core/db/functions');

exports.getUserById = function (conn, id) {
      // we have to return user data from its id
      var getUserByIdQuery = `select * from user where id=?`;
      return DBHelper.runSqlQuery(conn, getUserByIdQuery, [id], 0)
};



