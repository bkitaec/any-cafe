const proxy = require('http-proxy-middleware');

// FIXME: set the correct pathes
module.exports = function(app) {
    app.use(
        proxy('/graphql', {
            target: 'http://localhost:1313',
            changeOrigin: true,
            secure: false,
        })
    );
    app.use(
        proxy('/graphiql', {
            target: 'http://localhost:1313',
            changeOrigin: true,
            secure: false,
        })
    );
};
