const express = require('express');
   const path = require('path');
   const app = express();

   // Serve static files
   app.use(express.static(__dirname + '/dist/sistema-de-turnos-hdlh/browser'));

   // Send all requests to index.html
   app.get('/*', function(req, res) {
     res.sendFile(path.join(__dirname + '/dist/sistema-de-turnos-hdlh/browser/index.html'));
   });

   // Start the app by listening on the default Heroku port
   app.listen(process.env.PORT || 8080);