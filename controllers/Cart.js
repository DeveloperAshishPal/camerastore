let DBHelper = require('../core/db/functions');

// Get User Cart data
exports.getUserCart = function (conn, id) {
    var cartQuery = `select * from cart where user_id=? and is_paid = 0`;
    return DBHelper.runSqlQuery(conn, cartQuery,[id]).then(cart=>{
        cart[0].product = JSON.parse(cart[0].product);
        return cart;
    });
};

// Add Product To Cart
exports.addToCart = function (conn, query, userId) {
    // check if any cart already exists
    var checkCartQuery = 'select * from cart where user_id=? and is_paid = 0';
    return DBHelper.runSqlQuery(conn, checkCartQuery,[userId]).then(carts=>{
        if(carts.length){
            // cart exists add current product to it
            return fetchProductById(query.productId).then(product=>{
                productArr = JSON.parse(carts[0].product);
                console.log(product);
                var productObj = {
                    'product' : JSON.stringify(product[0]),
                    'quantity' : query.quantity
                }
                productArr.push(productObj);
                var cartUpdateQuery = 'Update cart set product=? where id=? and user_id=?';
                return DBHelper.runSqlQuery(conn,cartUpdateQuery,[productArr,carts[0].id,userId]);
            })
        }else{
            // create cart and add item(product)
            let cartObj = {
                'user_id': userId,
                'product' : JSON.stringify([query]) 
            }
            let sqlObj = DBHelper.insertQuery('cart', cartObj)
            return DBHelper.runSqlQuery(conn, sqlObj.sql, sqlObj.valueArr).then(data=>{
                console.log(data);
                return data;
            })
        }
    });


    let sqlObj = DBHelper.insertQuery('cart', query)
    return DBHelper.runSqlQuery(conn, sqlObj.sql, sqlObj.valueArr)
}

function fetchProductById(conn,productId){
    var fetchProductQuery = 'select * from product where id=? and is_active=1';
    return DBHelper.runSqlQuery(conn,fetchProductQuery,[productId]);
}