var app = require("./src/server/routes");
var http = require('http');
app.set('port', process.env.PORT || 6660);

// Start the server
var server = app.listen(6660, function() {
 console.log('Listening on port %d', server.address().port);
});