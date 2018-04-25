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





module.exports=router;