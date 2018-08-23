const { Client } = require('pg');
const pg = require('pg');
pg.defaults.ssl = true;
const client = new Client({
  connectionString: 'postgres://nxfyibeerzlslk:fc2e63648042c6f5f43e955ce52e994148978568b61c77e70ad7ee8c5f6962dc@ec2-54-228-251-254.eu-west-1.compute.amazonaws.com:5432/d88vsglfasevbg',
  ssl: true,
});

var today = new Date();
var text = 'I love you';


client.connect();

// client.query('CREATE TABLE Messages(id SERIAL PRIMARY KEY, message TEXT not null, dateTime TIMESTAMP);', (err) => {
//   if (err) throw err;
 
//   client.end();
// });

const query = {
  text: 'INSERT INTO Messages( message, dateTime) VALUES($1, $2)',
  values: [text, today],
}

client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } 
})

 