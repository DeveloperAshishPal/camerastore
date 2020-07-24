var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport, config, connection, User) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: config.identity.jwtSecret
  };
  passport.use(new JwtStrategy(opts, function (payload, done) {
    return User.getUserById(connection, payload.sub).then(function (user) {
      user.auth_payload = payload;
      return done(null, user);
    }).catch(function (err) {
      return done(err, false);
    });
  }));


};
