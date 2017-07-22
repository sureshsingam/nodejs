const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('./notes-data.json');
        return JSON.parse(notesString);
    }
    catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));        
};
// console.log(module)
var addNote = (title,body) =>{
    var notes = fetchNotes();
    var note = {
        title : title,
        body
    };
    var duplicateNotes = notes.filter((note)=> note.title === title);
    
    if (duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    else{
        return -1;
    }
 

};

var getAll = () => {
    return fetchNotes();
}

var getNote = (title) =>{
    var notes = fetchNotes();
    var retrievedNote = notes.filter( (note) => {
        return note.title === title;
    } );
    
    return retrievedNote[0];
};

var removeNote = (title) =>{
    // fetch notes
    var notes = fetchNotes();
    // Filter the notes , only elements that do not match the title will be kept
    var removedNotes = notes.filter( (note) =>  {
        return note.title !== title;        
    });
    saveNotes(removedNotes);
    return removedNotes.length !== notes.length;
};

var logNote = (note) =>{
    console.log('------');
    console.log(`Title: ${note.title} ` );
    console.log(`Body: ${note.body} ` );
};
module.exports = {
    // addNote: addNote
    addNote, // Es6 shortcut, means the same as above
    getAll,
    getNote,
    removeNote,
    logNote
}