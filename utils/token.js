const jwt = require('jsonwebtoken');
var config = require('./../config/index')(process.env.NODE_ENV);

// Generate an Access Token for the given User ID
function generateAccessToken(user) {
  // How long will the token be valid for
  const expiresIn = '1 hour';
  // Which service issued the token
  const issuer = config.authentication.issuer;
  // Which service is the token intended for
  const audience = config.authentication.audience;
  // The signing key for signing the token
  const secret = config.authentication.secret;

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    audience: audience,
    issuer: issuer,
    subject: user.toString()
  });
  return token;
}

module.exports = generateAccessToken;
