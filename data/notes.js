const mongoColections=require("../config/mongoCollections");
const notes=mongoColections.notes;
const requiredUsers=mongoColections.users;
const ObjectId=require('mongodb').ObjectId;

async function addNote(userId,content){
    const usersCollection=await requiredUsers();
    const theUser=await usersCollection.findOne({user_id:userId});
    if(!theUser) throw "User not found.";
    const notesCollection=await notes();

    let theNote={
        _id:new ObjectId(),
        user_id:theUser._id,
        note_content:content
    }   
    const noteInfo=await notesCollection.insertOne(theNote);
    if(noteInfo.insertedCount==0) throw "Could not add note.";
    return theNote;
}

async function getAllNotes(){
    const notesCollection=await notes();
    const allNotes=await notesCollection.find({}).toArray();
    let notesList=[];
    for(let i=0;i<allNotes.length;i++){
        let eachOne={
            _id:allNotes[i]._id,
            user_id:allNotes[i].user_id,
            note_content:allNotes[i].note_content   
        }
        notesList.push(eachOne);
    }
    return notesList;
}

async function getNotesByUserId(userId){
    const notesCollection=await notes();
    const allNotes=await notesCollection.find({}).toArray();
   
    if(!allNotes) throw "User not found.";
    let notesList=[];
    for(let i=0;i<allNotes.length;i++){
        if(allNotes[i].user_id==userId){
            notesList.push(allNotes[i]);
        }   
    }
    return notesList;
}

async function getTheNoteByNoteId(userId,noteId){
    const notesList=await getNotesByUserId(userId);
    if(notesList) {
        for(let i=0;i<notesList.length;i++){
            if(notesList[i]._id==noteId){
                return notesList[i];
            }
        }
    }  
}

async function updateNote(userId,noteId,suppliedChange){
    const notesCollection=await notes();
    const updatedNote={};
    if(suppliedChange.note_content){
        updatedNote.note_content=suppliedChange.note_content;
    }
    const updatedInfo=await notesCollection.updateOne(
        {_id:ObjectId(noteId)},
        {$set:updatedNote}
    ); 
    return await this.getTheNoteByNoteId(userId,noteId);
}

async function deleteNote(userId,noteId){
    if(!userId) throw "No userId provided.";
    if(!noteId) throw "No noteId provided.";
    const notesCollection=await notes();
    const theOne=await getTheNoteByNoteId(userId,noteId);

    if(theOne._id===noteId){
        const result=notesCollection.removeOne({_id:noteId});
        if(deleteInfo.deleteCount==0) throw "Could not delete note.";
    }
   
    return "{delete note: true}";
}


module.exports={addNote,getAllNotes,getNotesByUserId,getTheNoteByNoteId,updateNote,deleteNote};