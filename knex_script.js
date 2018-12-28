const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.host,
    port: settings.port,
  }
});

const newPerson = {
  'first_name': process.argv[2],
  'last_name': process.argv[3],
  'birthdate': process.argv[4]
};

 const insert = knex('famous_people')
  .insert(person).asCallback((err, res) => {
    if (err) return console.error(err);
    console.log('Row inserted');
  }).finally(function() {
    knex.destroy();
  });