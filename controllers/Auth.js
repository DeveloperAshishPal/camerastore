let DBHelper = require('../core/db/functions');
let jwt = require('jsonwebtoken');
let config = require('../config/index')(process.env.NODE_ENV)
let md5 = require('md5');

function generateAccessToken(user) {
    let token = {};
    // Which service issued the token
    const issuer = config.authentication.issuer;
    // Which service is the token intended for
    const audience = config.authentication.audience;
    // The signing key for signing the token
    const secret = config.identity.jwtSecret;

    token = jwt.sign({}, secret, {
        audience: audience,
        issuer: issuer,
        subject: user.toString()
    });
    return token;
}

function generateReferralCode() {
    let seed = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    let rString = randomString(6, seed);
    return `Endr${rString}`;
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// if no user found then register user
exports.login = function (conn,query) {
    console.log("email",query.email);
    let findUserByEmail = "select * from user where email=?";
    return DBHelper.runSqlQuery(conn, findUserByEmail, [query.email]).then(data => {
        console.log(data);
        if(data.length){
            data = data[0];
            if(data.password !== md5(query.password)){
                throw new Error('Incorrect Email/Password ')    
            }
            delete data.password
            return {
                        'token': generateAccessToken(data.id),
                        'userdata': data
            }
        }else{
            // add user
            let userObj = {
                'password' : md5('123456'),
                'email' : query.email
            }
            let sqlObj = DBHelper.insertQuery('user', userObj)
            return DBHelper.runSqlQuery(conn, sqlObj.sql, sqlObj.valueArr).then(data=>{
                console.log(data);
                return {
                    'token': generateAccessToken(data.insertId),
                    'userdata': data.insertId
                }
            })

        }
    })
}