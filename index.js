var app = require( 'express' )();
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );

const { Client } = require('pg');
const pg = require('pg');
pg.defaults.ssl = true;
const client = new Client({
  connectionString: 'postgres://nxfyibeerzlslk:fc2e63648042c6f5f43e955ce52e994148978568b61c77e70ad7ee8c5f6962dc@ec2-54-228-251-254.eu-west-1.compute.amazonaws.com:5432/d88vsglfasevbg',
  ssl: true,
});


app.get( '/', function ( req, res ) {
  res.sendFile( `${ __dirname }/docs/index.html` );
} );

io.on( 'connection', function ( socket ) {

  client.connect();
  const query = {
    text: 'SELECT message FROM Messages WHERE id = $1',
    values: [1],
  }
  
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      io.emit('result',res);
    }

    client.end();
  })

  console.log( 'a user connected' );

  socket.on( 'disconnect', function () {
    console.log( 'user disconnected' );
  } );

  socket.on( 'chat message', function ( msg ) {
    console.log( 'message: ' + msg );
    io.emit('chat message', msg);
  } );

} );

const port = process.env.PORT || 3000;

http.listen( port, function () {
  console.log( `listening on port: ${port}` );
});


