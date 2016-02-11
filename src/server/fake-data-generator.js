// generate fake data

var R = require('ramda');
var faker = require('faker');
// // loads only ru locale
// var faker = require('faker/locale/de');
// // use certain locale
// faker.locale = "ru";
var nLoop = R.range(0);
var mailId = 1;
var contactId = 1;
var boxes = ['Inbox', 'Starred', 'Important', 'Sent', 'Drafts'];
function aMail() {
  return {
    id: mailId++,
    sender: faker.name.findName(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    email: faker.internet.email(),
    box: boxes[Math.floor(Math.random() * boxes.length)],
    date: faker.date.past(),
    read: Math.random() < 0.5, // random boolean
    important: Math.random() < 0.5,
    withAttachment: Math.random() < 0.3
  };
}

function aContact() {
  return {
    id: contactId++,
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    date: faker.date.past(),
    phone: faker.phone.phoneNumberFormat()
  };
}

function aUser() {
    return {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
}

var data = {
    mail: nLoop(1000).map(aMail),
    contact: nLoop(100).map(aContact),
    user: nLoop(10).map(aUser)
};
// other usecase
// var data = {
//     mail: {
//         Inbox: nLoop(700).map(aMail),
//         Starred: nLoop(100).map(aMail),
//         Important: nLoop(20).map(aMail),
//         Sent: nLoop(300).map(aMail),
//         Drafts: nLoop(10).map(aMail),
//     }
// };
require('fs').writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf-8');