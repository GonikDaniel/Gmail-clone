// generate fake data

var R = require('ramda');
var faker = require('faker');
// // loads only ru locale
// var faker = require('faker/locale/de');
// // use certain locale
// faker.locale = "ru";
var nLoop = R.range(0);
var id = 1;
var boxes = ['Inbox', 'Starred', 'Important', 'Sent', 'Drafts'];
function aMail() {
  return {
    id: id++,
    sender: faker.name.findName(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    email: faker.internet.email(),
    box: boxes[Math.floor(Math.random() * boxes.length)],
    date: faker.date.past(),
    read: Math.random() < 0.5, // random boolean
    important: Math.random() < 0.5
  };
}
var data = {
    mail: nLoop(1000).map(aMail)
};
// other usecase
// var data = {
//     mail: {
//         inbox: nLoop(700).map(aMail),
//         starred: nLoop(100).map(aMail),
//         important: nLoop(20).map(aMail),
//         "sent mail": nLoop(300).map(aMail),
//         drafts: nLoop(10).map(aMail),
//     }
// };
require('fs').writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf-8');