const pg = require("pg");
const moment = require("moment");
const settings = require("./settings"); // settings.json
const input = process.argv.slice(2).toString();

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function createResponse(name, number, firstname, lastname, date) {
  console.log(`Found ${number} person(s) by the name '${name}':`)
  for (var i = 1; i <= number; i++) {
    let birthdate = moment(date[i - 1]).subtract(10, 'days').calendar().replace("/", "-").replace("/", "-");
    console.log(`- ${i}: ${firstname[i - 1]} ${lastname[i - 1]}, born '${birthdate}'`)
  }
};

function findPeople(db, cr, name) {
  db.query("SELECT * FROM famous_people", (err, res) => {
    console.log('err', err);
    let count = 0;
    let firstname = [];
    let lastname = [];
    let date = [];
    console.log("Searching ...");
    res.rows.forEach(function(obj) {
      if (obj.first_name === name || obj.last_name === name) {
        count += 1;
        firstname.push(obj.first_name);
        lastname.push(obj.last_name);
        date.push(obj.birthdate);
      }
    })
    cr(name, count, firstname, lastname, date);
    client.end();
  });
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Given name: ', input.toString())
  findPeople(client, createResponse, input)
});

