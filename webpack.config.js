var environment = (process.env.NODE_ENV || 'development').trim();

if(environment === 'development') {
    module.exports = require('./ClientApp/config/webpack.dev.js')
} else {
    module.exports = require('./ClientApp/config/webpack.prod.js')
}