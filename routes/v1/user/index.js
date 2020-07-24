let express = require('express');

module.exports = function (passport, cache) {
  let Router = express.Router();
  let RouteHelper = require('../../../utils/routes.js')(passport);
  
  // this how we will include file for more seperated routes
  require('./cart')(Router, RouteHelper);
  require('./product')(Router, RouteHelper);

  return Router;
};
