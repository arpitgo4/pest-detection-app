
const app = require('../app');
const cluster = require('cluster');

function startServer() {

    // returns http-server instance
    return app.listen(process.env.PORT || 8080, function(err) {
        if (err) {
          return console.error(err);
        }
  
        console.log('Listening at http://localhost:' + (process.env.PORT || 8080));
    });
};

module.exports = startServer();