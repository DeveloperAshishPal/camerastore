let cartService = require('../../../services/cart')

module.exports = function (Router, RouteHelper) {

// Detail of challenges
Router.get('/cart/detail',
RouteHelper.isLoggedIn,
function (req, res) {
   return cartService.getUserCart(req.user.id).then(data=>{
       return RouteHelper.sendResponse(res,{
           'data':data,
           'status':200
       });
   }).catch(function (err) {
       console.log(err)
       return res.status(500).json({
           message: err
       });
   });
});

Router.post('/cart/add',
expressJoi.joiValidate({
    product: Joi.required(),
    quantity: Joi.required()
  }, {
      strict: false
}),
RouteHelper.isLoggedIn,
function (req,res) {
    return cartService.addToCart(req.body,req.user.id).then(data=>{
        return RouteHelper.sendResponse(res,{
            'data':data,
            'status':200
        });
    }).catch(function (err) {
        console.log(err)
        return res.status(500).json({
            message: err
        });
    });
});

}
