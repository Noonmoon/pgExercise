const settings = require("./settings");
const pg = require("pg");
var knex = require('knex')({
  client:  'pg',
  connection: {
    "user": "development",
    "password": "development",
    "database": "test_db",
    "hostname": "localhost",
    "port": 5432,
    "ssl": true
  },
  pool: { min: 0, max: 7}
});
const moment = require("moment");
const input = process.argv.slice(2).toString();

function insertName(first_name, last_name, birthdate) {
  knex('famous_people')
  .insert({first_name: `${first_name}`, last_name: `${nachu}`, birthdate:  `${2002-11-16}`}).asCallback(function (err, res) {
    if (err) {
      console.log(err)
    } else {
    console.log("inserted table")
    knex.destroy()
    }
  })
}
insertName(okay, yup, 2016-02-12);

