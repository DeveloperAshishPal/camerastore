let config = require('./config.json');

module.exports = function(env = 'development'){
    return config[env];
}