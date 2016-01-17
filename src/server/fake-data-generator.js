// generate fake data

var R = require('ramda');
var faker = require('faker');
// // loads only ru locale
// var faker = require('faker/locale/de');
// // use certain locale
// faker.locale = "ru";
var nLoop = R.range(0);
var id = 1;
function aMail() {
  return {
    id: id++,
    sender: faker.name.findName(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    email: faker.internet.email(),
    date: faker.date.past(),
    important: Math.random() < 0.5 // random boolean
  };
}
var data = {
    mail: nLoop(10).map(aMail)
};
require('fs').writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf-8');