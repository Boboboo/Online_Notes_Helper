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
 
    // let newNote={
    //     $push:{notes:theNote}
    // }
    
    const noteInfo=await notesCollection.insertOne(theNote);
    if(noteInfo.insertedCount==0) throw "Could not add note.";
    // await usersCollection.updateOne({_id: ObjectId(userId)},newNote);
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


module.exports={addNote,getAllNotes};