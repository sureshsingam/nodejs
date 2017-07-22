// var obj = {
//     name:'Suresh',
//     age:33,
//     address:'62-25 Trailside Lane'
// };

// var stringOBJ=JSON.stringify(obj);

// console.log(typeof stringOBJ);
// console.log(stringOBJ);

// var personString = '{"name":"Suresh", "age":33}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person.name ," ",person.age);

const fs = require('fs');

var originalNote = {
    title:'Some title',
    body:'Some body'
}
var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title, " ", note.body)