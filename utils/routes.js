module.exports = function(passport) {
  var service = {};

  service.isLoggedIn = function(req, res, next) {
    passport.authenticate('jwt', {
      session: false
    }, function(err, user, info) {
      if (err || !user) {
        console.log(err);
        return res.status(401).json({
          status: 401,
          message: 'Unauthorized' 
        });
      }
      req.user = user;
      return next();

    })(req, res);

  };

  service.sendResponse = function(res, obj, statusCode = 200, message = 'Success') {
    var newObj = obj;
    if (message.length) {
      newObj.message = message;
    }
    res.status(statusCode).json(newObj);
  };

  service.sendErrResponse = function(res, errorCode = 'ERR_INTERNAL_SERVER') {
    res.status(CODES[errorCode].status).json(CODES[errorCode]);
  };

  const CODES = {
    ERR_INTERNAL_SERVER: {
      status : 500,
      message : 'INTERNAL SERVER ERROR'
    },
    ERR_TOKEN_NOT_FOUND: {
      status : 404,
      message : 'TOKEN NOT FOUND'
    },
    ERR_NOT_FOUND: {
      status : 404,
      message : 'DATA NOT FOUND'
    }
  }
  
  return service;
};
