const router=require("express").Router();
const data=require("../data");
const notesData=data.notes;
const usersData=data.users;

router.get("/", async (req,res)=>{
    res.status(200).send("Note root");
});

router.post("/:userId",async(req,res)=>{
    let noteInfo=req.body;
    if (!noteInfo) {
        res.status(400).json({ error: "You must provide data to create a note." });
        return;
    }
    if(!req.params.userId){
        res.status(400).json({error:"You must provide a user_id"});
        return;  
    }
    if(!noteInfo.note_content){
        res.status(400).json({error:"You must provide a note content"});
        return;  
    }
    try{
        const newNote=await notesData.addNote(noteInfo.userId,noteInfo.note_content);
        res.json(newNote);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/all", async (req,res)=>{
    try{
        const all=await notesData.getAllNotes();
        console.log(all);
        res.json(all); 
    }catch(e){
        console.log(e);
        
    }   
});

router.get("/:userId", async (req,res)=>{
    try{
        const theNotes=await notesData.getNotesByUserId(req.params.userId);
        console.log(theNotes);
        res.json(theNotes); 
    }catch(e){
        console.log(e);
        
    }   
});

router.get("/:userId/:noteId", async (req,res)=>{
    try{
        const theNote=await notesData.getTheNoteByNoteId(req.params.userId,req.params.noteId);
        console.log(theNote);
        res.json(theNote); 
    }catch(e){
        console.log(e);
        
    }   
});

router.put("/:userId/:noteId",async(req,res)=>{
    let noteInfo=req.body;
    try{
        await notesData.getTheNoteByNoteId(req.params.userId,req.params.noteId);
    }catch(e){
        res.status(404).json({error: "Note not found."});
    }
    try{
        const result=await notesData.updateNote(req.params.userId,req.params.noteId,noteInfo);
        res.json(result);
    }catch(e){
        res.sendStatus(500);
    }
});

router.delete("/:userId/:noteId",async(req,res)=>{
    try {
        await notesData.getTheNoteByNoteId(req.params.userId,req.params.noteId);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(404).json({error:"The note not found."});
    }

    try {
        await notesData.deleteNote(req.params.noteId);
        res.sendStatus(200);
    } catch (e) {
        res.status(500);
    }
})


module.exports=router;