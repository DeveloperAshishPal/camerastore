let express = require('express');
var expressJoi = require('express-joi');
var Joi = expressJoi.Joi;

module.exports = function (passport, cache) {
  let Router = express.Router();
  let RouteHelper = require('../../../utils/routes.js')(passport);
  let authService = require('../../../services/auth')
    
    Router.post('/login', expressJoi.joiValidate({
      email: Joi.string().min(5).email().required(),
      password: Joi.string().min(2).required()
    }, {
        strict: false
      })
      , function (req, res) {
        return authService.login(req.body).then(data=>{
          console.log(data);
          return RouteHelper.sendResponse(res,{
            "userDetails": data.userdata,
            "token": data.token,
            "token_type": "Bearer",
            'status':200
          });
        }).catch(function (err) {
            console.log("Authentication Error",err);
            return RouteHelper.sendErrResponse(res); 
        });
      });
  return Router;
};
