var app = require("./src/server/routes");

// Start the server
var server = app.listen(6660, function() {
 console.log('Listening on port %d', server.address().port);
});