let productService = require('../../../services/product')

module.exports = function (Router, RouteHelper) {

// List products
Router.get('/product/list',
function (req, res) {
   return productService.productList().then(data=>{
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
