let auth = require('./v1/auth/index');
let user = require('./v1/user/index');


exports.mountAPI = function (mount, app, passport, cache) {
  app.use(mount + '/auth', auth(passport));
  app.use(mount + '/user', user(passport, cache));
};
