const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOptions = {
        describe:'Title of note',
        demand:true,
        alias:'t'
    };
const bodyOptions = {
        describe:'Body of note',
        demand:true,
        alias:'b'
    };

//using chaining command where the output from the chained method will be used as
// input to the next item in the chain
const argv = yargs.command('add','Add a new note',{
    title:titleOptions,
    body:bodyOptions    
})
.command('read','Read existing note',{
    title:titleOptions,
    body:bodyOptions
})
.command('list','list all notes ')
.command('remove','Remove note',{
    title:titleOptions   
})
.help().argv;
var command = argv._[0];


if (command === 'add'){
    var note = notes.addNote(argv.title,argv.body);
    if(note != -1){
        console.log("New Note added: ", note);
        notes.logNote(note);
    }
    else{
        console.log("Note was not added, possible duplication with existing notes ", note);
    }
}
else if (command === 'list'){
    var all_notes = notes.getAll();
    console.log(`printing ${all_notes.length} note(s). `);
    all_notes.forEach( (note) => {
        notes.logNote(note);
    });
}
else if (command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log("Note retrieved: ");
        notes.logNote(note);
    }
    else{
        console.log("Note does not exist ", note);
    }
}
else if (command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note removed" : "No Note needed to be removed";
    console.log(message);
}
else {
    console.log('Command not recognised');
}


